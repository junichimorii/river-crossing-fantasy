import { useCarrierState, useCarrier, useCastState, useCasts } from '@/composables'
import { carrierState } from '@/composables/use-carrier-state'
import { castState } from '@/composables/use-cast-state'
import type { Ref } from 'vue'
import type { Carrier, Cast, Scene, State, Move } from '@/types'

/**
 * 川渡りパズル
 */
const useScene = (
  state: Ref<State>,
  scene: Ref<Scene>,
) => {
  const { isCrossed: isCarrierCrossed, cross: crossCarrier } = useCarrierState(state)
  const { getDuration, hasPassengers, isAvailable } = useCarrier(state, scene)
  const { isCrossed: isCastCrossed, getOn, getOff, cross: crossCast, feel, calmDown, isNeighboring } = useCastState(state)
  const { passengers, groups, isPeaceable, isEeachEvery } = useCasts(state, scene)

  /**
   * シーンの状態を初期化
   */
  const init = async () => {
    state.value.carriers = scene.value.carriers.map(() => structuredClone(carrierState))
    state.value.casts = scene.value.casts.map(() => structuredClone(castState))
  }

  /**
   * 搭乗可能な乗り物（空席があり、登場人物と同じ岸）がないか問い合わせる
   */
  const reserve = async (
    cast: Cast,
  ) => scene.value.carriers.find(carrier => (isCarrierCrossed(carrier) === isCastCrossed(cast)) && isAvailable(carrier))

  /**
   * 乗り物に登場人物を乗せる
   */
  const pickUp = async (
    cast: Cast,
  ) => {
    const carrier = await reserve(cast)
    if (carrier === undefined) return false
    getOn(cast, carrier)
    return true
  }

  /**
   * 乗り物から登場人物を降ろす
   */
  const dropOff = async (
    cast: Cast,
  ) => {
    getOff(cast)
  }

  /**
   * 乗り物が出発する
   */
  const leave = async (
    carrier: Carrier,
  ) => {
    if (!hasPassengers(carrier)) return
    // 乗り物の位置を変化させる
    crossCarrier(carrier)
  }

  /**
   * 乗り物が対岸に到着する
   */
  const arrive = async (
    carrier: Carrier,
  ) => {
    if (!hasPassengers(carrier)) return
    // 履歴を追加
    const move: Move = {
      casts: passengers.value[carrier.id],
      value: getDuration(carrier),
    }
    // 登場人物を乗り物から降ろす
    for await (const cast of passengers.value[carrier.id]) {
      crossCast(cast)
      getOff(cast)
    }
    await safetyConfirmation()
    if (!isPeaceable.value) {
      move.result = 'failed'
    } else {
      if (isEeachEvery.value) {
        move.result = 'succeeded'
      }
    }
    return move
  }

  /**
   * 安否確認
   */
  const safetyConfirmation = async () => {
    for await (const cast of scene.value.casts) {
      calmDown(cast)
    }
    switch (scene.value.category) {
      case 'predators-and-guardians':
      case 'escorting-celebrity':
        // 敵と保護者がいるパズルにおける安否確認
        await predation()
        break
      case 'keep-majority':
        // 半数以上を維持するパズルにおける安否確認
        await rebellion()
        break
    }
  }

  /**
   * 敵の捕食が成功したかどうか
   */
  const predation = async () => {
    for await (const myself of scene.value.casts) {
      if (!myself.role.predators) continue
      for await (const my of myself.role.predators) {
        const predator = scene.value.casts[my.predator]
        // 敵と隣接している
        if (isNeighboring(myself, predator)) {
          const guardian = scene.value.casts[my.guardian]
          // 保護者が近くにいない
          if (!isNeighboring(myself, guardian)) {
            // 感情を追加
            feel(myself, 'scared')
            feel(predator, 'excited')
            feel(guardian, 'surprised')
          }
        }
      }
    }
  }

  /**
   * 反乱が成功したかどうか
   */
  const rebellion = async () => {
    for await (const casts of groups.value) {
      const missionaries = casts.filter(cast => !cast.role.rebel)
      if (missionaries.length === 0) continue
      const cannibals = casts.filter(cast => cast.role.rebel)
      if (cannibals.length === 0) continue
      if (missionaries.length < cannibals.length) {
        for (const cast of missionaries) feel(cast, 'scared')
        for (const cast of cannibals) feel(cast, 'excited')
      }
    }
    const missionaries = scene.value.casts.filter(cast => !cast.role.rebel)
    if (missionaries.some(cast => state.value.casts[cast.id].emotions.length > 0)) {
      for await (const cast of missionaries) {
        if (state.value.casts[cast.id].emotions.length === 0) {
          feel(cast, 'surprised')
        }
      }
    }
  }

  return {
    init,
    pickUp,
    dropOff,
    leave,
    arrive,
    safetyConfirmation,
  }
}
export default useScene
export type UseSceneReturn = ReturnType<typeof useScene>
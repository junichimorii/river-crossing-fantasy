import type { Carrier, Cast, Scene, State, Move } from '@/types'
import type { Bound } from '@/types/state'
import type { Ref } from 'vue'
import { useCarrierState, useCarrier, useCastState, useCasts } from '@/composables'
import { carrierState } from '@/composables/use-carrier-state'
import { castState } from '@/composables/use-cast-state'

/**
 * 川渡りパズル
 */
const useScene = (
  state: Ref<State>,
  scene: Ref<Scene>,
) => {
  const { coord: carrierCoord } = useCarrierState(state)
  const { getElapsedTime, hasPassengers, isVacancy } = useCarrier(state, scene)
  const { coord: castCoord, boarding, getOn, getOff, arrive: arriveCast, feel, calmDown, isNeighboring } = useCastState(state)
  const { passengers, groups, isPeaceable, isReached } = useCasts(state, scene)
  // エルフ（人間嫌い）が登場するパズル
  const hasMisanthrope = scene.value.casts.some(cast => cast.role.misanthrope)
  // 吟遊詩人（孤独嫌い）が登場するパズル
  const hasMonophobia = scene.value.casts.some(cast => cast.role.monophobia)
  // 敵と保護者が登場するパズル
  const hasPredators = scene.value.casts.some(cast => cast.role.predators)
  // 半数以上を維持するパズル
  const hasRebels = scene.value.casts.some(cast => cast.role.rebel)
  // 乗り物の耐久性があるパズル
  const hasRepairers = scene.value.casts.some(cast => cast.role.repairer)

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
  ) => scene.value.carriers.find(carrier => (carrierCoord(carrier) === castCoord(cast)) && isVacancy(carrier, cast))

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
   * 乗り物が対岸に到着する
   */
  const arrive = async (
    carrier: Carrier,
  ) => {
    if (!hasPassengers(carrier)) return
    const bound: Bound = carrierCoord(carrier) > castCoord(passengers.value[carrier.id][0])
      ? 'inbound'
      : 'outbound'
    // 履歴を追加
    const move: Move = {
      casts: passengers.value[carrier.id],
      bound: bound,
      value: getElapsedTime(carrier),
    }
    // 登場人物を乗り物から降ろす
    for await (const cast of passengers.value[carrier.id]) {
      arriveCast(cast, carrier)
      getOff(cast)
    }
    // 安否確認
    await safetyConfirmation()
    if (!isPeaceable.value) {
      move.result = 'failed'
    } else {
      if (isReached.value) {
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
    // エルフ（人間嫌い）が登場するパズル
    if (hasMisanthrope) {
      await antagonism()
    }
    // 吟遊詩人（孤独嫌い）が登場するパズル
    if (hasMonophobia) {
      await swarming()
    }
    // 敵と保護者が登場するパズル
    if (hasPredators) {
      await predation()
    }
    // 半数以上を維持するパズル
    if (hasRebels) {
      await rebellion()
    }
    // 乗り物の耐久性があるパズル
    if (hasRepairers) {
      await workout()
    }
  }

  /**
   * 嫌いな登場人物と乗り物に同乗しているかどうか
   */
  const antagonism = async () => {
    // 人間（亜人以外）
    const humans = scene.value.casts.filter(cast => !cast.role.demihuman)
    for await (const myself of scene.value.casts) {
      if (!myself.role.misanthrope) continue
      if (boarding(myself) === null) continue
      for await (const human of humans) {
        // 嫌悪対象と隣接している
        if (isNeighboring(myself, human)) {
          // 感情を追加
          feel(myself, 'surprised')
        }
      }
    }
  }

  /**
   * 近くに人がいるかどうか
   */
  const swarming = async () => {
    for await (const myself of scene.value.casts) {
      if (!myself.role.monophobia) continue
      const others = scene.value.casts.filter(cast => cast !== myself)
      // 乗り物に乗っている
      if (boarding(myself) !== null) {
        if (!others.some(cast => boarding(myself) === boarding(cast))) {
          feel(myself, 'scared')
          for await (const cast of others) {
            feel(cast, 'surprised')
          }
        }
      // 乗り物に乗っていない
      } else {
        if (others.filter(cast => boarding(cast) === null && castCoord(myself) === castCoord(cast)).length === 0) {
          feel(myself, 'scared')
          for await (const cast of others) {
            feel(cast, 'surprised')
          }
        }
      }
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

  /**
   * 乗り物の耐久試験
   */
  const workout = async () => {
    const repairers = scene.value.casts.filter(cast => cast.role.repairer)
    const others = scene.value.casts.filter(cast => !cast.role.repairer)
    const isRepaired = scene.value.carriers.every(carrier =>
      repairers.some(repairer => carrierCoord(carrier) === castCoord(repairer))
    )
    if (isRepaired) return
    for (const cast of repairers) feel(cast, 'surprised')
    for (const cast of others) feel(cast, 'scared')
  }

  return {
    init,
    pickUp,
    dropOff,
    arrive,
    safetyConfirmation,
  }
}
export default useScene
export type UseSceneReturn = ReturnType<typeof useScene>
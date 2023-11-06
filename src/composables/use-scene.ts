import { useCarrier, useCasts } from '@/composables'
import type { Ref } from 'vue'
import type { Carrier } from '@/types/carrier'
import type { Cast } from '@/types/cast'
import type { Scene } from '@/types/scene'
import type { State, CarrierState, CastState } from '@/types/state'
import type { Move } from '@/types/moves'
const carrierState: CarrierState = Object.freeze({
  isCrossed: false,
})
const castState: CastState = Object.freeze({
  isCrossed: false,
  boarding: null,
  emotions: [],
})

/**
 * 川渡りパズル
 */
const useScene = (
  state: Ref<State>,
  scene: Ref<Scene>,
) => {
  const { getDuration, hasPassengers, isAvailable } = useCarrier(state, scene)
  const { passengers, groups, isPeaceable, isCrossed } = useCasts(state, scene)

  /**
   * シーンの状態を初期化
   */
  const init = async () => {
    if(state.value.carriers.length === 0) {
      state.value.carriers = scene.value.carriers.map(x => structuredClone(carrierState))
    }
    if(state.value.casts.length === 0) {
      state.value.casts = scene.value.casts.map(x => structuredClone(castState))
    }
  }

  /**
   * 搭乗可能な乗り物（空席があり、登場人物と同じ岸）がないか問い合わせる
   */
  const reserve = async (
    cast: Cast,
  ) => scene.value.carriers.find(carrier =>
    (state.value.carriers[carrier.id].isCrossed === state.value.casts[cast.id].isCrossed)
    && isAvailable(carrier)
  )

  /**
   * 乗り物に登場人物が乗ろうとした時
   */
  const getOn = async (
    cast: Cast,
  ) => {
    const carrier = await reserve(cast)
    if (carrier === undefined) return false
    state.value.casts[cast.id].boarding = carrier.id
    await safetyConfirmation()
  }

  /**
   * 乗り物から登場人物が降りた時
   */
  const getOff = async (
    cast: Cast,
  ) => {
    state.value.casts[cast.id].boarding = null
    await safetyConfirmation()
  }

  /**
   * 乗り物が出発した時
   */
  const leave = async (
    carrier: Carrier,
  ) => {
    if (!hasPassengers(carrier)) return
    // 乗り物の位置を変化させる
    state.value.carriers[carrier.id].isCrossed = !state.value.carriers[carrier.id].isCrossed
  }

  /**
   * 乗り物が到着した時
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
      state.value.casts[cast.id].isCrossed = !state.value.casts[cast.id].isCrossed
      state.value.casts[cast.id].boarding = null
    }
    await safetyConfirmation()
    if (!isPeaceable.value) {
      move.result = 'failed'
    } else {
      if (isCrossed.value) {
        move.result = 'succeeded'
      }
    }
    return move
  }

  /**
   * 安否確認
   */
  const safetyConfirmation = async () => {
    for await (const cast of state.value.casts) {
      cast.emotions = []
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
            state.value.casts[myself.id].emotions.push('scared')
            state.value.casts[predator.id].emotions.push('excited')
            state.value.casts[guardian.id].emotions.push('surprised')
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
        for (const cast of missionaries) state.value.casts[cast.id].emotions.push('scared')
        for (const cast of cannibals) state.value.casts[cast.id].emotions.push('excited')
      }
    }
    const missionaries = scene.value.casts.filter(cast => !cast.role.rebel)
    if (missionaries.some(cast => state.value.casts[cast.id].emotions.length > 0)) {
      for await (const cast of missionaries) {
        if (state.value.casts[cast.id].emotions.length === 0) {
          state.value.casts[cast.id].emotions.push('surprised')
        }
      }
    }
  }

  /**
   * 2人のキャラクターが隣接しているかどうか
   */
  const isNeighboring = (
    a: Cast,
    b: Cast,
  ) => (state.value.casts[a.id].boarding === state.value.casts[b.id].boarding)
    && (state.value.casts[a.id].isCrossed === state.value.casts[b.id].isCrossed)

  return {
    init,
    getOn,
    getOff,
    leave,
    arrive,
  }
}
export default useScene
export type UseSceneReturn = ReturnType<typeof useScene>
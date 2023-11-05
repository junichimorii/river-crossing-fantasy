import { computed, ref } from 'vue'
import { carrierStatus, castStatus } from '@/store/statuses'
import { useCarrier, useCasts } from '@/composables'
import type { Ref } from 'vue'
import type { Carrier } from '@/types/carrier'
import type { Cast } from '@/types/cast'
import type { Scene } from '@/types/scene'
import type { Move } from '@/types/moves'

/**
 * 川渡りパズル
 */
const useScene = (
  state: Ref<Scene>
) => {
  const { getPassengers, getDuration, getLoad, hasPassengers, isAvailable, isReady } = useCarrier(state)
  const { unreachers, reachers, passengers, isPeaceable, isCrossed } = useCasts(state)

  /**
   * シーンの状態を初期化
   */
  const init = async () => {
    for await (const carrier of state.value.carriers) {
      carrier.status = structuredClone(carrierStatus)
    }
    for await (const cast of state.value.casts) {
      cast.status = structuredClone(castStatus)
    }
  }

  /**
   * 搭乗可能な乗り物（空席があり、登場人物と同じ岸）がないか問い合わせる
   */
  const reserve = async (
    cast: Cast,
  ) => state.value.carriers.find(carrier => isAvailable(carrier) && carrier.status.isCrossed === cast.status.isCrossed)

  /**
   * 乗り物に登場人物が乗ろうとした時
   */
  const getOn = async (
    cast: Cast,
  ) => {
    const carrier = await reserve(cast)
    if (carrier === undefined) return false
    cast.status.boarding = carrier.id
    await safetyConfirmation()
  }

  /**
   * 乗り物から登場人物が降りた時
   */
  const getOff = async (
    cast: Cast,
  ) => {
    cast.status.boarding = undefined
    await safetyConfirmation()
  }

  /**
   * 乗り物が出発した時
   */
  const leave = async (
    carrier: Carrier,
  ) => {
    if (!hasPassengers(carrier)) return
    // 乗り物を進行中の状態にする
    carrier.status.isSailing = true
    // 乗り物の位置を変化させる
    carrier.status.isCrossed = !carrier.status.isCrossed
  }

  /**
   * 乗り物が到着した時
   */
  const arrive = async (
    carrier: Carrier,
  ) => {
    if (!hasPassengers(carrier)) return
    const passengers = getPassengers(carrier)
    // 履歴を追加
    const move: Move = {
      casts: passengers,
      value: getDuration(carrier),
    }
    // 乗り物を停止中の状態にする
    carrier.status.isSailing = false
    // 登場人物を乗り物から降ろす
    for await (const cast of passengers) {
      cast.status.isCrossed = !cast.status.isCrossed
      cast.status.boarding = undefined
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
      cast.status.emotions = []
    }
    switch (state.value.category) {
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
    for await (const myself of state.value.casts) {
      if (!myself.role.predators) continue
      for await (const my of myself.role.predators) {
        const predator = state.value.casts[my.predator]
        // 敵と隣接している
        if (isNeighboring(myself, predator)) {
          const guardian = state.value.casts[my.guardian]
          // 保護者が近くにいない
          if (!isNeighboring(myself, guardian)) {
            myself.status.emotions.push('scared')
            predator.status.emotions.push('excited')
            guardian.status.emotions.push('surprised')
          }
        }
      }
    }
  }

  /**
   * 反乱が成功したかどうか
   */
  const rebellion = async () => {
    for await (const casts of [
      unreachers.value,
      reachers.value,
      passengers.value.flat()
    ]) {
      const missionaries = casts.filter(cast => !cast.role.rebel)
      if (missionaries.length === 0) continue
      const cannibals = casts.filter(cast => cast.role.rebel)
      if (cannibals.length === 0) continue
      if (missionaries.length < cannibals.length) {
        for (const cast of missionaries) cast.status.emotions.push('scared')
        for (const cast of cannibals) cast.status.emotions.push('excited')
      }
    }
    const missionaries = state.value.casts.filter(cast => !cast.role.rebel)
    if (missionaries.some(cast => cast.status.emotions.length > 0)) {
      for await (const cast of missionaries) {
        if (cast.status.emotions.length === 0) {
          cast.status.emotions.push('surprised')
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
  ) => (a.status.boarding === b.status.boarding) && (a.status.isCrossed === b.status.isCrossed)

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
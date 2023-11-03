import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import type { Carrier } from '@/types/carrier'
import type { Cast } from '@/types/cast'
import type { Scene } from '@/types/scene'
import type { Queue } from '@/types/queue'

/**
 * 川渡りパズル
 */
const usePuzzle = (
  config: Scene
) => {
  /** シーンの設定 */
  const state: Ref<Scene> = ref(config)
  /** 出発地点の登場人物 */
  const unreachers = computed(() => state.value.casts.filter(cast => cast.status.boarding === undefined && !cast.status.isCrossed))
  /** 到着地点の登場人物 */
  const reachers = computed(() => state.value.casts.filter(cast => cast.status.boarding === undefined && cast.status.isCrossed))
  /** 乗り物 */
  const carriers = computed(() => state.value.carriers.map(carrier => {
    /** 乗り物に乗っている登場人物 */
    const passengers = state.value.casts.filter(cast => cast.status.boarding === carrier.id)
    // 対岸までの所要時間
    const duration = Math.max(...passengers.map(cast => cast.role.duration || 1))
    // 積載重量
    const load = passengers.reduce((weight, cast) => weight + (cast.role.weight ? cast.role.weight : 0), 0)
    // 空席があるかどうか
    const isVacancy = passengers.length < carrier.capacity
    // 重量オーバーかどうか
    const isOverweight = carrier.weightLimit !== undefined && load > carrier.weightLimit
    // 操作可能かどうか
    const isOperable = passengers.some(cast => cast.role.canRow === undefined || cast.role.canRow)
    // 利用可能かどうか
    const isAvailable = isVacancy && !isOverweight
    // 出発可能かどうか
    const isReady = !carrier.status.isSailing && isOperable && !isOverweight
    // 上方向に進行可能かどうか
    const upbound = isReady && !isEmergency.value && !carrier.status.isCrossed
    // 下方向に進行可能かどうか
    const downbound = isReady && !isEmergency.value && carrier.status.isCrossed
    return Object.assign(carrier, {
      passengers: passengers,
      duration: duration,
      load: load,
      isAvailable: isAvailable,
      isReady: isReady,
      upbound: upbound,
      downbound: downbound,
    })
  }))
  /** いずれかの登場人物が乗り物に乗っているかどうか */
  const isGotOnRower = computed(() => state.value.casts.some(cast => cast.status.boarding !== undefined))
  /** いずれかの登場人物が非常事態かどうか */
  const isEmergency = computed(() => state.value.casts.some(cast => cast.status.emotions.length > 0))
  /** すべての登場人物が対岸にいるかどうか */
  const isCompleted = computed(() => state.value.casts.every(cast => cast.status.boarding === undefined && cast.status.isCrossed))

  /**
   * 搭乗可能な乗り物（空席があり、登場人物と同じ岸）がないか問い合わせる
   */
  const reserve = async (
    cast: Cast,
  ) => carriers.value.find(carrier => carrier.isAvailable && carrier.status.isCrossed === cast.status.isCrossed)

  /**
   * 乗り物に登場人物が乗ろうとした時
   */
  const toGetOn = async (
    cast: Cast,
  ) => {
    // 搭乗可能な乗り物を問い合わせ
    const carrier = await reserve(cast)
    if (carrier === undefined) return false
    cast.status.boarding = carrier.id
    // 安否確認
    const isSafe = await safetyConfirmation()
    // 出航準備の結果
    const readied = carrier.isReady
    return isSafe && readied
  }

  /**
   * 乗り物から登場人物が降りた時
   */
  const getOff = async (
    cast: Cast,
  ) => {
    cast.status.boarding = undefined
    // 安否確認
    await safetyConfirmation()
  }

  /**
   * 乗り物が出発した時
   */
  const leave = async (
    carrier: Carrier,
  ) => {
    // 乗り物に誰も乗っていない場合は何もしない
    if (!isGotOnRower.value) return
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
    // 乗り物に誰も乗っていない場合は何もしない
    if (!isGotOnRower.value) return
    const { passengers, duration } = carriers.value[carrier.id]
    // 履歴を追加
    const queue: Queue = {
      casts: structuredClone(passengers),
      value: duration,
    }
    // 乗り物を停止中の状態にする
    carrier.status.isSailing = false
    // 登場人物を乗り物から降ろす
    passengers.forEach(cast => {
      // 登場人物の位置を変化させる
      cast.status.isCrossed = !cast.status.isCrossed
      cast.status.boarding = undefined
    })
    // 安否確認
    const isSafe = await safetyConfirmation()
    if (!isSafe) {
      queue.result = 'failed'
    } else {
      // クリア判定
      if (isCompleted.value) {
        queue.result = 'succeeded'
      }
    }
    return queue
  }

  /**
   * 安否確認
   */
  const safetyConfirmation = async () => {
    state.value.casts.forEach(async cast => {
      cast.status.emotions = []
    })
    // 敵と保護者がいるパズルにおける安否確認
    const isPredated = (state.value.category === 'predators-and-guardians' || state.value.category === 'escorting-celebrity')
      ? await predation()
      : false
    // 半数以上を維持するパズルにおける安否確認
    const isRebelled = (state.value.category === 'keep-majority')
      ? await rebellion()
      : false
    return !(isPredated || isRebelled)
  }

  /**
   * 敵の捕食が成功したかどうか
   */
  const predation = async () => {
    const results = await Promise.all(state.value.casts.map(async myself => {
      if (!myself.role.predators) return false
      const results = await Promise.all(myself.role.predators.map(async my => {
        const predator = state.value.casts.find(other => other.id === my.predator)
        // 敵と隣接している
        if (predator && isNeighboring(myself, predator)) {
          const guardian = state.value.casts.find(other => other.id === my.guardian)
          // 保護者が近くにいない
          if (guardian && !isNeighboring(myself, guardian)) {
            myself.status.emotions.push('scared')
            predator.status.emotions.push('excited')
            guardian.status.emotions.push('surprised')
            return true
          }
        }
        return false
      }))
      return results.some(isError => isError)
    }))
    return results.some(isError => isError)
  }

  /**
   * 反乱が成功したかどうか
   */
  const rebellion = async () => {
    const results = await Promise.all([
      unreachers.value,
      reachers.value,
      carriers.value.map(carrier => carrier.passengers).flat()
    ].map(casts => {
      const missionaries = casts.filter(cast => !cast.role.rebel)
      if (missionaries.length === 0) return false
      const cannibals = casts.filter(cast => !cast.role.rebel)
      if (cannibals.length === 0) return false
      if (missionaries.length < cannibals.length) {
        missionaries.forEach(cast => cast.status.emotions.push('scared'))
        cannibals.forEach(cast => cast.status.emotions.push('excited'))
        return true
      }
      return false
    }))
    if (results.some(isError => isError)) {
      state.value.casts.filter(cast => !cast.role.rebel).forEach(cast => {
        if (cast.status.emotions.length === 0) cast.status.emotions.push('surprised')
      })
    }
    return results.some(isError => isError)
  }

  /**
   * 2人のキャラクターが隣接しているかどうか
   */
  const isNeighboring = (
    a: Cast,
    b: Cast,
  ) => (a.status.boarding === b.status.boarding) && (a.status.isCrossed === b.status.isCrossed)

  return {
    state,
    unreachers,
    reachers,
    carriers,
    isEmergency,
    isCompleted,
    toGetOn,
    getOff,
    leave,
    arrive,
  }
}
export default usePuzzle
export type UsePuzzleReturn = ReturnType<typeof usePuzzle>
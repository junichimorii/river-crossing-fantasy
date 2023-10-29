import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage, useWindowSize } from '@vueuse/core'
import { carrierStatus, castStatus } from '@/store/statuses'
import type { UseSwipeDirection } from '@vueuse/core'
import type { Scene, Queue, Activity } from '@/types/scene'
import type { Carrier } from '@/types/carrier'
import type { Cast } from '@/types/cast'
const { width, height } = useWindowSize()

/**
 * シーン（ステージ）管理
 */
export const useSceneStore = defineStore('scene', () => {
  const state = useStorage<Scene>(
    'RIVER_CROSSING_SCENE',
    {
      id: 0,
      title: '',
      description: {
        conditions: '',
        transportation: '',
      },
      category: 'unconditioned',
      passing: 0,
      landscape: '',
      carriers: [],
      casts: [],
    },
    sessionStorage
  )
  
  /**
   * シーンの行動履歴
   */
  const queue = useStorage<Set<Queue>>(
    'RIVER_CROSSING_QUEUE',
    new Set<Queue>(),
    sessionStorage,
  )

  /**
   * シーンの行動実績
   */
  const activities = useStorage<Set<Activity>>(
    'RIVER_CROSSING_ACTIVITY',
    new Set<Activity>(),
    sessionStorage,
  )

  /** スコア */
  const score = useStorage<number>(
    'RIVER_CROSSING_SCORE',
    0,
    sessionStorage,
  )

  /** カウンター */
  const count = computed(() => Array.from(queue.value).reduce((a, b) => a + b.duration, 0))
  /** ステージのサイズ */
  const stageSize = computed(() => Math.min(width.value, height.value, Math.max(width.value, height.value) * 3 / 4))
  /** コンテンツの高さ */
  const navigationHeight = computed(() => height.value - stageSize.value - 56)
  /** 登場人物の幅 */
  const castWidth = computed(() => Math.min(stageSize.value / state.value.casts.length, stageSize.value / 10))
  /** 出発地点の登場人物 */
  const unreachers = computed(() => state.value.casts.filter(cast => cast.status.boarding === undefined && !cast.status.isCrossed))
  /** 到着地点の登場人物 */
  const reachers = computed(() => state.value.casts.filter(cast => cast.status.boarding === undefined && cast.status.isCrossed))
  /** 乗り物に乗っている登場人物 */
  const passengers = computed(() => state.value.carriers.map(carrier =>
    state.value.casts.filter(cast => cast.status.boarding === carrier.id))
  )
  /** すべての登場人物が対岸にいるかどうか */
  const isCompleted = computed(() => state.value.casts.every(cast => cast.status.boarding === undefined && cast.status.isCrossed))
  /** 規定回数を超過したかどうか */
  const isExceeded = computed(() => count.value > state.value.passing)
  /** いずれかの登場人物が非常事態かどうか */
  const isEmergency = computed(() => state.value.casts.some(cast => cast.status.emotions.length > 0))

  /**
   * シーンを読み込む
   */
  const load = async (config: Scene) => {
    state.value = config
    queue.value = new Set<Queue>([])
    activities.value = new Set<Activity>([])
    await init()
  }

  /**
   * シーンの状態を消去
   */
  const unload = async () => {
    state.value = null
    queue.value = null
    activities.value = null
    score.value = null
  }

  /**
   * シーンの状態を初期化
   */
  const init = async () => {
    state.value.carriers.forEach(carrier => {
      carrier.status = structuredClone(carrierStatus)
    })
    state.value.casts.forEach(cast => {
      cast.status = structuredClone(castStatus)
    })
    queue.value.clear()
    activities.value.clear()
    score.value = 0
  }

  /**
   * 登場人物をスワイプした時
   */
  const action = async (
    cast: Cast,
    direction: UseSwipeDirection
  ) => {
    if (cast.status.disabled) return
    // 動作の種別を取得
    const request = cast.status.boarding !== undefined && direction === (cast.status.isCrossed ? 'up' : 'down')
      ? 'getOff' // 乗り物から降りる
      : (cast.status.boarding === undefined && direction === (cast.status.isCrossed ? 'down' : 'up'))
        ? 'getOn' // 乗り物に乗る
        : null
    if (!request) return
    if (request === 'getOff') {
      // 登場人物を乗り物から降ろす
      await getOff(cast)
    } else {
      // 搭乗可能な乗り物があれば乗る
      await getOn(cast)
    }
  }

  /**
   * 搭乗可能な乗り物（空席があり、登場人物と同じ岸）がないか問い合わせる
   */
  const reserve = async (
    cast: Cast,
  ) => {
    const carrier = state.value.carriers.find(carrier =>
      getCarrierStatus(carrier).isAvailable && carrier.status.isCrossed === cast.status.isCrossed
    )
    return carrier
  }

  /**
   * 乗り物に登場人物が乗ろうとした時
   */
  const getOn = async (
    cast: Cast,
  ) => {
    const carrier = await reserve(cast)
    if (carrier === undefined) return false
    cast.status.boarding = carrier.id
    if (getCarrierStatus(carrier).isReady) {
      activities.value.add('ready')
    }
    // 安否確認
    return await safetyConfirmation()
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
    // 乗り物を操作できる状態になった実績がない場合は何もしない
    if (!activities.value.has('ready')) return
    // 乗り物を進行中の状態にする
    carrier.status.isSailing = true
    // 乗り物の位置を変化させる
    carrier.status.isCrossed = !carrier.status.isCrossed
    // 登場人物の操作を無効にする
    state.value.casts.forEach(cast => {
      cast.status.disabled = true
    })
  }

  /**
   * 乗り物が到着した時
   */
  const arrive = async (
    carrier: Carrier,
  ) => {
    // 乗り物を操作できる状態になった実績がない場合は何もしない
    if (!activities.value.has('ready')) return
    // 履歴を追加
    queue.value.add({
      casts: passengers.value[carrier.id],
      duration: getCarrierStatus(carrier).duration
    })
    // 乗り物を停止中の状態にする
    carrier.status.isSailing = false
    // 登場人物の操作を有効にする
    state.value.casts.forEach(cast => {
      cast.status.disabled = false
    })
    // 登場人物を乗り物から降ろす
    passengers.value[carrier.id].forEach(cast => {
      // 登場人物の位置を変化させる
      cast.status.isCrossed = !cast.status.isCrossed
      cast.status.boarding = undefined
    })
    // 安否確認
    const isSafe = await safetyConfirmation()
    if (!isSafe) {
      activities.value.add('failed')
      await terminate()
    } else {
      // クリア判定
      if (isCompleted.value) {
        activities.value.add('completed')
        await terminate()
      }
    }
  }

  /**
   * 乗り物の移動可能な進行方向を取得
   */
  const getCarrierStatus = (
    carrier: Carrier
  ) => {
    // 対岸までの所要時間
    const duration = Math.max(...passengers.value[carrier.id].map(cast => cast.role.duration || 1))
    // 積載重量
    const load = passengers.value[carrier.id].reduce((weight, cast) => weight + (cast.role.weight ? cast.role.weight : 0), 0)
    // 空席があるかどうか
    const isVacancy = passengers.value[carrier.id].length < carrier.capacity
    // 重量オーバーかどうか
    const isOverweight = carrier.weightLimit !== undefined && load > carrier.weightLimit
    // 操作可能かどうか
    const isOperable = passengers.value[carrier.id].some(cast => cast.role.canRow === undefined || cast.role.canRow)
    // 利用可能かどうか
    const isAvailable = isVacancy && !isOverweight
    // 出発可能かどうか
    const isReady = !carrier.status.isSailing && isOperable && !isOverweight
    // 上方向に進行可能かどうか
    const upbound = isReady && !isEmergency.value && !carrier.status.isCrossed
    // 下方向に進行可能かどうか
    const downbound = isReady && !isEmergency.value && carrier.status.isCrossed
    return {
      duration: duration,
      load: load,
      isAvailable: isAvailable,
      isReady: isReady,
      upbound: upbound,
      downbound: downbound,
    }
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
      passengers.value.flat()
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
   * シーンの終了時
   */
  const terminate = async () => {
    score.value = activities.value.has('completed')
      ? isExceeded.value
        ? 1
        : 2
      : activities.value.has('failed')
        ? -1
        : 0
    return score.value
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
    queue,
    activities,
    score,
    count,
    stageSize,
    navigationHeight,
    castWidth,
    unreachers,
    reachers,
    passengers,
    isCompleted,
    isExceeded,
    load,
    unload,
    init,
    action,
    getOn,
    leave,
    arrive,
    getCarrierStatus,
  }
})
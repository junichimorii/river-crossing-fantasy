import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage, useWindowSize } from '@vueuse/core'
import type { UseSwipeDirection } from '@vueuse/core'
import useCarrier from '@/composables/use-carrier'
import useCast from '@/composables/use-cast'
import { defaultStatus as defaultCarrierStatus } from '@/composables/use-carrier'
import { defaultStatus as defaultCastStatus } from '@/composables/use-cast'
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
  const navigationHeight = computed(() => height.value - stageSize.value)
  /** 登場人物の幅 */
  const castWidth = computed(() => Math.min(stageSize.value / state.value.casts.length, stageSize.value / 10))
  /** 出発地点のキャラクター */
  const originCasts = computed(() => state.value.casts.filter(cast => cast.status.boarding === undefined && !cast.status.isCrossed))
  /** 到着地点のキャラクター */
  const destinationCasts = computed(() => state.value.casts.filter(cast => cast.status.boarding === undefined && cast.status.isCrossed))
  /** いずれかの登場人物が非常事態かどうか */
  const isEmergency = computed(() => state.value.casts.some(cast => cast.status.emotions.length > 0))
  /** すべての登場人物が対岸にいるかどうか */
  const isCompleted = computed(() => state.value.casts.every(cast => cast.status.boarding === undefined && cast.status.isCrossed))
  /** 規定回数を超過したかどうか */
  const isExceeded = computed(() => count.value > state.value.passing)

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
    state.value.carriers.forEach(async carrier => carrier.status = structuredClone(defaultCarrierStatus))
    state.value.casts.forEach(async cast => cast.status = structuredClone(defaultCastStatus))
    queue.value.clear()
    activities.value.clear()
    score.value = 0
  }

  /**
   * 搭乗可能な乗り物（空席があり、登場人物と同じ岸）がないか問い合わせる
   */
  const reserve = async (
    cast: Cast,
  ) => {
    const carrier = state.value.carriers.find(carrier =>
      isAvailable(carrier) && carrier.status.isCrossed === cast.status.isCrossed
    )
    return carrier
  }

  /**
   * 登場人物をスワイプした時の行動
   */
  const action = async (
    cast: Cast,
    direction: UseSwipeDirection
  ) => {
    activities.value.add('swiped')
    if (cast.status.disabled) return
    const request = await useCast(cast).request(direction)
    if (request === 'getOff') {
      // 登場人物を船から降ろす
      await useCast(cast).getOff()
      await Promise.all(state.value.carriers.map(async carrier => {
        await useCarrier(carrier).dropOff(cast.id)
      }))
      activities.value.add('gotOff')
    } else if(request === 'getOn') {
      // 搭乗可能な乗り物があれば登場人物を船に乗せる
      const carrier = await reserve(cast)
      if (carrier === undefined) return
      await useCast(cast).getOn(carrier.id)
      await useCarrier(carrier).pickUp(cast.id)
      activities.value.add('gotOn')
      if (direction === 'down') {
        activities.value.add('gotOnFromOpposite')
      }
      if (isReady(carrier)) {
        activities.value.add('gotOnRower')
      }
    }
    // 安否確認
    await safetyConfirmation()
  }

  /**
   * 乗り物が出発した時の行動
   */
  const leave = async () => {
    if (!activities.value.has('gotOnRower')) return
    await Promise.all(state.value.casts.map(async cast => {
      return await useCast(cast).deactivate()
    }))
    activities.value.add('left')
  }

  /**
   * 乗り物が到着した時の行動
   */
  const arrive = async (
    carrier: Carrier,
  ) => {
    if (!activities.value.has('gotOnRower')) return
    queue.value.add({
      casts: carrier.status.passengers.sort(),
      duration: getDuration(carrier)
    })
    await Promise.all(state.value.casts.map(async cast => {
      return await useCast(cast).activate()
    }))
    await useCarrier(carrier).arrive()
    await Promise.all(carrier.status.passengers.map(async castId => {
      // 登場人物を船から降ろす
      const cast = getCast(castId)
      if (!cast) return
      await useCast(cast).crossed()
      await useCast(cast).getOff()
      await useCarrier(carrier).dropOff(castId)
    }))
    state.value.casts.forEach(async cast => {
      cast.status.emotions = []
    })
    const isFailed = await safetyConfirmation()
    if (isFailed) {
      activities.value.add('failed')
      await terminate()
    } else {
      activities.value.add('arrived')
      // クリア判定
      if (isCompleted.value) {
        activities.value.add('completed')
        await terminate()
      }
    }
  }

  /**
   * 登場人物を取得
   */
  const getCast = (
    id: number
  ) => {
    return state.value.casts.find(cast => cast.id === id)
  }

  /**
   * 乗り物の対岸までの所要時間を取得
   */
  const getDuration = (
    carrier: Carrier
  ) => Math.max(...carrier.status.passengers.map(castId => getCast(castId)?.role.duration || 1))

  /**
   * 乗り物の積載重量を取得
   */
  const getLoad = (
    carrier: Carrier
  ) => carrier.status.passengers.reduce((weight, castId) => {
    const cast = getCast(castId)
    return weight + (cast !== undefined && cast.role.weight ? cast.role.weight : 0)
  }, 0)

  /**
   * 乗り物の進行方向かどうかを取得
   */
  const getCarrierBound = (
    carrier: Carrier
  ) => isReady(carrier)
    ? !carrier.status.isCrossed
      ? 'up'
      : 'down'
    : 'none'

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
    return isPredated || isRebelled
  }

  /**
   * （敵と保護者がいるパズルにおいて）敵が行動を開始する
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
            myself.status.emotions.push('😰')  // 怖い、危機に瀕している
            predator.status.emotions.push('😈') // 喜んでいる
            guardian.status.emotions.push('😖')  // 困っている
            return true
          }
        }
        return false
      }))
      return results.some(isError => isError === true)
    }))
    state.value.casts.forEach(async cast => {
      cast.status.emotions = Array.from(new Set(cast.status.emotions))
    })
    return results.some(isError => isError === true)
  }

  /**
   * （半数以上を維持するパズルにおいて）反乱を企てる
   */
  const rebellion = async () => {
    const results = await Promise.all([
      originCasts.value,
      destinationCasts.value,
      state.value.carriers.flatMap(carrier => carrier.status.passengers.map(castId => getCast(castId)))
    ].map(casts => {
      const missionaries = casts.filter(cast => cast?.role.rebel === false)
      if (missionaries.length === 0) return false
      const cannibals = casts.filter(cast => cast?.role.rebel === true)
      if (cannibals.length === 0) return false
      if (missionaries.length < cannibals.length) {
        missionaries.forEach(cast => cast?.status.emotions.push('😰'))
        cannibals.forEach(cast => cast?.status.emotions.push('😈'))
        return true
      }
      return false
    }))
    if (results.some(isError => isError === true)) {
      state.value.casts.filter(cast => cast.role.rebel === false).forEach(async cast => {
        if (cast.status.emotions.length === 0) cast.status.emotions.push('😖')
      })
    }
    return results.some(isError => isError === true)
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
  }

  /**
   * 乗り物が重量オーバーかどうかを取得
   */
  const isOverweight = (
    carrier: Carrier
  ) => carrier.weightLimit !== undefined && getLoad(carrier) > carrier.weightLimit

  /**
   * 乗り物が利用可能かどうかを取得
   */
  const isAvailable = (
    carrier: Carrier
  ) => {
    // 乗り物に空席がある
    const isVacancy = carrier.status.passengers.length < carrier.capacity
    return isVacancy && !isOverweight(carrier)
  }

  /**
   * 乗り物を操作可能かどうかを取得
   */
  const isOperable = (
    carrier: Carrier
  ) => carrier.status.passengers.some(castId => {
    const cast = getCast(castId)
    return cast !== undefined && (cast.role.canRow === undefined || cast.role.canRow)
  })

  /**
   * 乗り物が出発可能かどうかを取得
   */
  const isReady = (
    carrier: Carrier
  ) => !carrier.status.isSailing && isOperable(carrier) && !isOverweight(carrier)

  /**
   * 2人のキャラクターが隣接しているかどうか
   */
  const isNeighboring = (
    a: Cast,
    b: Cast,
  ) => (a.status.boarding && b.status.boarding) && (a.status.isCrossed && b.status.isCrossed)

  return {
    state,
    queue,
    activities,
    score,
    count,
    stageSize,
    navigationHeight,
    castWidth,
    originCasts,
    destinationCasts,
    isEmergency,
    isCompleted,
    isExceeded,
    load,
    unload,
    init,
    action,
    leave,
    arrive,
    getCast,
    getDuration,
    getLoad,
    getCarrierBound,
  }
})
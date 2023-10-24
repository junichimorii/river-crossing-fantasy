import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage, useWindowSize } from '@vueuse/core'
import type { UseSwipeDirection } from '@vueuse/core'
import useCarrier from '@/composables/use-carrier'
import useCast from '@/composables/use-cast'
import { defaultStatus as defaultCarrierStatus } from '@/composables/use-carrier'
import { defaultStatus as defaultCastStatus } from '@/composables/use-cast'
import type { Scene, History, Activity } from '@/types/scene'
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
  const history = useStorage<Set<History>>(
    'RIVER_CROSSING_HISTORY',
    new Set<History>(),
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
  const count = computed(() => Array.from(history.value).reduce((a, b) => a + b.duration, 0))
  /** ステージのサイズ */
  const stageSize = computed(() => Math.min(width.value, height.value, Math.max(width.value, height.value) * 3 / 4))
  /** 登場人物の幅 */
  const castWidth = computed(() => Math.min(stageSize.value / state.value.casts.length, stageSize.value / 10))
  /** 出発地点のキャラクター */
  const originCasts = computed(() => state.value.casts.filter(cast => useCast(cast).location.value === 'origin'))
  /** 到着地点のキャラクター */
  const destinationCasts = computed(() => state.value.casts.filter(cast => useCast(cast).location.value === 'destination'))
  /** 出発地点の右端のキャラクター */
  const originRightEndCast = computed(() => originCasts.value.reduce((a, b) => a.id > b.id ? a : b))
  /** いずれかの登場人物が非常事態かどうか */
  const isEmergency = computed(() => state.value.casts.some(cast => cast.status.emotions.length > 0))
  /** すべての登場人物が対岸にいるかどうか */
  const isCompleted = computed(() => state.value.casts.every(cast => useCast(cast).location.value === 'destination'))
  /** 規定回数を超過したかどうか */
  const isExceeded = computed(() => count.value > state.value.passing)

  /**
   * シーンを読み込む
   */
  const load = async (config: Scene) => {
    state.value = config
    history.value = new Set<History>([])
    activities.value = new Set<Activity>([])
    await init()
  }

  /**
   * シーンの状態を消去
   */
  const unload = async () => {
    state.value = null
    history.value = null
    activities.value = null
    score.value = null
  }

  /**
   * シーンの状態を初期化
   */
  const init = async () => {
    state.value.carriers.forEach(async carrier => carrier.status = structuredClone(defaultCarrierStatus))
    state.value.casts.forEach(async cast => cast.status = structuredClone(defaultCastStatus))
    history.value.clear()
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
      useCarrier(carrier).isAvailable.value && carrier.status.isCrossed === cast.status.isCrossed
    )
    return carrier
  }

  /**
   * 登場人物をスワイプした時の行動
   */
  const action = async(
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
        await useCarrier(carrier).dropOff(cast)
      }))
      activities.value.add('gotOff')
    } else if(request === 'getOn') {
      // 搭乗可能な乗り物があれば登場人物を船に乗せる
      const carrier = await reserve(cast)
      if (carrier === undefined) return
      await useCast(cast).getOn()
      await useCarrier(carrier).pickUp(cast)
      activities.value.add('gotOn')
      if (direction === 'down') {
        activities.value.add('gotOnFromOpposite')
      }
      if (useCarrier(carrier).isReady.value) {
        activities.value.add('gotOnRower')
      }
    }
    state.value.casts.forEach(async cast => {
      cast.status.emotions = []
    })
    await predation()
    await rebellion()
  }

  /**
   * （敵と保護者がいるパズルにおいて）敵が行動を開始する
   */
  const predation = async () => {
    if (state.value.category !== 'predators-and-guardians' && state.value.category !== 'escorting-celebrity') return false
    const results = await Promise.all(state.value.casts.map(async myself => {
      if (!myself.role.predators) return false
      const results = await Promise.all(myself.role.predators.map(async my => {
        const predator = state.value.casts.find(other => other.id === my.predator)
        if (predator && useCast(predator).location.value === useCast(myself).location.value) {
          const guardian = state.value.casts.find(other => other.id === my.guardian)
          if (guardian && useCast(guardian).location.value !== useCast(myself).location.value) {
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
    if (state.value.category !== 'keep-majority') return false
    const results = await Promise.all([
      originCasts.value,
      destinationCasts.value,
      state.value.carriers.flatMap(carrier => carrier.status.passengers)
    ].map(casts => {
      const missionaries = casts.filter(cast => cast.role.rebel === false)
      if (missionaries.length === 0) return false
      const cannibals = casts.filter(cast => cast.role.rebel === true)
      if (cannibals.length === 0) return false
      if (missionaries.length < cannibals.length) {
        missionaries.forEach(cast => cast.status.emotions.push('😰'))
        cannibals.forEach(cast => cast.status.emotions.push('😈'))
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
    history.value.add({
      casts: carrier.status.passengers.sort((a, b) => a.id < b.id ? -1 : 1),
      duration: useCarrier(carrier).duration.value
    })
    await Promise.all(state.value.casts.map(async cast => {
      return await useCast(cast).activate()
    }))
    await useCarrier(carrier).arrive()
    await Promise.all(carrier.status.passengers.map(async cast => {
      // 登場人物を船から降ろす
      await useCast(cast).crossed()
      await useCast(cast).getOff()
      await useCarrier(carrier).dropOff(cast)
    }))
    state.value.casts.forEach(async cast => {
      cast.status.emotions = []
    })
    const isPredated = await predation()
    const isRebelled = await rebellion()
    if (isPredated || isRebelled) {
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

  return {
    state,
    history,
    activities,
    score,
    count,
    stageSize,
    castWidth,
    originCasts,
    destinationCasts,
    originRightEndCast,
    isEmergency,
    isCompleted,
    isExceeded,
    load,
    unload,
    init,
    action,
    leave,
    arrive,
  }
})
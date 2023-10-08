import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage, useWindowSize } from '@vueuse/core'
import type { UseSwipeDirection } from '@vueuse/core'
import useCarrier from '@/composables/use-carrier'
import useCast from '@/composables/use-cast'
import type { Scene } from '@/types/scene'
import type { Carrier } from '@/types/carrier'
import type { Cast } from '@/types/cast'
const { width, height } = useWindowSize()
/**
 * シーン（ステージ）管理
 */
export const useSceneStore = defineStore('scene', () => {
  const state = useStorage<Scene>('RIVER_CROSSING_SCENE', {
    id: 0,
    title: '',
    description: {
      conditions: '',
      transportation: '',
    },
    landscape: '',
    carriers: [],
    casts: [],
  }, sessionStorage)
  /** ステージのサイズ */
  const stageSize = computed(() => Math.min(width.value, height.value, Math.max(width.value, height.value) * 3 / 4))
  /** 登場人物のサイズ */
  const castSize = computed(() => Math.min(stageSize.value / state.value.casts.length, stageSize.value / 10))
  /** 川幅（乗り物が往復する距離） */
  const riverSize = computed(() => stageSize.value * 0.35)
  /** 出発地点のキャラクター */
  const originCasts = computed(() => state.value.casts.filter(cast => useCast(cast).location.value === 'origin'))
  /** 到着地点のキャラクター */
  const destinationCasts = computed(() => state.value.casts.filter(cast => useCast(cast).location.value === 'destination'))
  /** すべての登場人物が対岸にいるかどうか */
  const isCompleted = computed(() => state.value.casts.every(cast => useCast(cast).location.value === 'destination'))
  /**  パズルを準備する */
  const init = async (
    config: Scene
  ) => {
    state.value = config
  }
  /** 乗り物と登場人物の状態を初期化 */
  const start = async () => {
    state.value.carriers.forEach(carrier => {
      useCarrier(carrier).init()
    })
    state.value.casts.forEach(cast => {
      useCast(cast).init()
    })
  }
  /** 登場人物をスワイプした時の行動 */
  const action = async(
    cast: Cast,
    direction: UseSwipeDirection
  ) => {
    console.log(`scene: swipe ${direction} by cast ${cast.id}`)
    if(cast.status.disabled) return
    const request = await useCast(cast).request(direction)
    if(request === 'getOff') {
      // 登場人物を船から降ろす
      await useCast(cast).getOff()
      state.value.carriers.forEach(async carrier => {
        await useCarrier(carrier).dropOff(cast)
      })
    } else if(request === 'getOn'){
      // 搭乗可能な乗り物（空席があり、登場人物と同じ岸）があれば登場人物を船に乗せる
      const carrier = state.value.carriers.find(carrier =>
        useCarrier(carrier).available.value && carrier.status.isCrossed === cast.status.isCrossed
      )
      if (carrier === undefined) return
      await useCast(cast).getOn()
      await useCarrier(carrier).pickUp(cast)
    }
  }
  /** 乗り物が出発した時の行動 */
  const leave = async (
    carrier: Carrier,
  ) => {
    console.log(`scene: leave by carrier ${carrier.id}`)
    state.value.casts.forEach(cast => {
      useCast(cast).deactivate()
    })
  }
  /** 乗り物が到着した時の行動 */
  const arrive = async (
    carrier: Carrier,
  ) => {
    console.log(`scene: arrive by carrier ${carrier.id}`)
    state.value.casts.forEach(cast => {
      useCast(cast).activate()
    })
    await useCarrier(carrier).arrive()
    carrier.status.passengers.forEach(async cast => {
      // 登場人物を船から降ろす
      await useCast(cast).crossed()
      await useCast(cast).getOff()
      await useCarrier(carrier).dropOff(cast)
    })
  }
  return {
    state,
    stageSize,
    riverSize,
    castSize,
    originCasts,
    destinationCasts,
    isCompleted,
    init,
    start,
    action,
    leave,
    arrive,
  }
})
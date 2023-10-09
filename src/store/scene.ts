import { computed, ref, Ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage, useWindowSize } from '@vueuse/core'
import type { UseSwipeDirection } from '@vueuse/core'
import useCarrier from '@/composables/use-carrier'
import useCast from '@/composables/use-cast'
import type { Scene, Record } from '@/types/scene'
import type { Carrier } from '@/types/carrier'
import type { Cast } from '@/types/cast'
import { s01, s02 } from './scenes'
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
    passing: 0,
    landscape: '',
    carriers: [],
    casts: [],
  }, sessionStorage)
  /** シーン一覧 */
  const scenes = [ s01, s02 ]
  /** シーンの実績 */
  const records: Ref<Set<Record>> = ref(new Set<Record>())
  /** ステージのサイズ */
  const stageSize = computed(() => Math.min(width.value, height.value, Math.max(width.value, height.value) * 3 / 4))
  /** 登場人物の幅 */
  const castWidth = computed(() => Math.min(stageSize.value / state.value.casts.length, stageSize.value / 10))
  /** 出発地点のキャラクター */
  const originCasts = computed(() => state.value.casts.filter(cast => useCast(cast).location.value === 'origin'))
  /** 到着地点のキャラクター */
  const destinationCasts = computed(() => state.value.casts.filter(cast => useCast(cast).location.value === 'destination'))
  /** すべての登場人物が対岸にいるかどうか */
  const isCompleted = computed(() => state.value.casts.every(cast => useCast(cast).location.value === 'destination'))
  /** 指定されたIDのシーンを読み込む */
  const load = async (id: number) => {
    const config = scenes.find(scene => scene.id === id)
    if(!config) throw false
    state.value = config
    console.log('scene: loaded')
  }
  /** シーンの状態を初期化 */
  const start = async () => {
    console.log('scene: start')
    await Promise.all(state.value.carriers.map(async carrier => {
      return await useCarrier(carrier).init()
    }))
    await Promise.all(state.value.casts.map(async cast => {
      return await useCast(cast).init()
    }))
    records.value.clear()
    records.value.add('started')
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
      await Promise.all(state.value.carriers.map(async carrier => {
        await useCarrier(carrier).dropOff(cast)
      }))
    } else if(request === 'getOn'){
      // 搭乗可能な乗り物（空席があり、登場人物と同じ岸）があれば登場人物を船に乗せる
      const carrier = state.value.carriers.find(carrier =>
        useCarrier(carrier).available.value && carrier.status.isCrossed === cast.status.isCrossed
      )
      if (carrier === undefined) return
      await useCast(cast).getOn()
      await useCarrier(carrier).pickUp(cast)
      records.value.add('gotOn')
      if (useCarrier(carrier).canLeave.value) {
        records.value.add('gotOnRower')
      }
    }
  }
  /** 乗り物が出発した時の行動 */
  const leave = async (
    carrier: Carrier,
  ) => {
    console.log(`scene: leave by carrier ${carrier.id}`)
    await Promise.all(state.value.casts.map(async cast => {
      return await useCast(cast).deactivate()
    }))
    records.value.add('left')
  }
  /** 乗り物が到着した時の行動 */
  const arrive = async (
    carrier: Carrier,
  ) => {
    console.log(`scene: arrive by carrier ${carrier.id}`)
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
    records.value.add('arrived')
    // クリア判定
    if (isCompleted.value) {
      terminate()
    }
  }
  /** シーンの終了時 */
  const terminate = async () => {
    records.value.add('completed')
  }
  return {
    state,
    records,
    stageSize,
    castWidth,
    originCasts,
    destinationCasts,
    isCompleted,
    load,
    start,
    action,
    leave,
    arrive,
  }
})
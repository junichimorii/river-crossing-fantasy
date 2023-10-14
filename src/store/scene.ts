import { computed, ref, Ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage, useWindowSize } from '@vueuse/core'
import type { UseSwipeDirection } from '@vueuse/core'
import useCarrier from '@/composables/use-carrier'
import useCast from '@/composables/use-cast'
import { defaultStatus as defaultCarrierStatus } from '@/composables/use-carrier'
import { defaultStatus as defaultCastStatus } from '@/composables/use-cast'
import type { Action } from '@/types/records'
import type { Scene, History } from '@/types/scene'
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
    category: null,
    passing: 0,
    landscape: '',
    carriers: [],
    casts: [],
  }, sessionStorage)

  /** シーン継続中 */
  const isPlaying = ref(false)
  /** シーンの行動履歴 */
  const history: Ref<Set<History>> = ref(new Set<History>())
  /** シーンの行動実績 */
  const actions: Ref<Set<Action>> = ref(new Set<Action>())
  /** ヒントテキスト */
  const hintText = computed(() => actions.value.has('completed')
    ? ''
    : actions.value.has('arrived')
      ? '対岸のキャラクターを舟に乗せる時は下方向にスワイプします。'
      : actions.value.has('gotOnRower')
        ? 'ボタンをタップすると対岸へ移動します。'
        : actions.value.has('gotOn')
          ? '舟を漕げるキャラクターが乗っていない場合は移動することができません。'
          : '移動させたいキャラクターを上方向にスワイプしてください。'
  )
  /** カウンター */
  const count = computed(() => [...history.value].reduce((a, b) => a + b.duration, 0))
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

  /** シーンを読み込む */
  const load = async (config: Scene) => {
    state.value = config
    await init()
  }

  const unload = async () => {
    state.value = null
  }

  /** シーンの状態を初期化 */
  const init = async () => {
    state.value.carriers.forEach(async carrier => carrier.status = structuredClone(defaultCarrierStatus))
    state.value.casts.forEach(async cast => cast.status = structuredClone(defaultCastStatus))
    history.value.clear()
    actions.value.clear()
  }

  /** シーンを開始 */
  const start = async () => {
    await init()
    isPlaying.value = true
    actions.value.add('started')
    console.log('scene: started')
  }

  /** 登場人物をスワイプした時の行動 */
  const action = async(
    cast: Cast,
    direction: UseSwipeDirection
  ) => {
    console.log(`scene: swipe ${direction} by cast ${cast.id}.`)
    if(cast.status.disabled) return
    const request = await useCast(cast).request(direction)
    if(request === 'getOff') {
      // 登場人物を船から降ろす
      await useCast(cast).getOff()
      await Promise.all(state.value.carriers.map(async carrier => {
        await useCarrier(carrier).dropOff(cast)
      }))
      console.log(`scene: cast ${cast.id} got off the carrier.`)
    } else if(request === 'getOn'){
      // 搭乗可能な乗り物（空席があり、登場人物と同じ岸）があれば登場人物を船に乗せる
      const carrier = state.value.carriers.find(carrier =>
        useCarrier(carrier).available.value && carrier.status.isCrossed === cast.status.isCrossed
      )
      if (carrier === undefined) return
      await useCast(cast).getOn()
      await useCarrier(carrier).pickUp(cast)
      actions.value.add('gotOn')
      console.log(`scene: cast ${cast.id} got on the carrier ${carrier.id}.`)
      if (useCarrier(carrier).canLeave.value) {
        actions.value.add('gotOnRower')
      }
    }
  }

  /** 乗り物が出発した時の行動 */
  const leave = async (
    carrier: Carrier,
  ) => {
    if (!actions.value.has('gotOnRower')) return
    await Promise.all(state.value.casts.map(async cast => {
      return await useCast(cast).deactivate()
    }))
    actions.value.add('left')
    console.log(`scene: carrier ${carrier.id} left.`)
  }

  /** 乗り物が到着した時の行動 */
  const arrive = async (
    carrier: Carrier,
  ) => {
    if (!actions.value.has('gotOnRower')) return
    history.value.add({
      casts: carrier.status.passengers,
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
    actions.value.add('arrived')
    console.log(`scene: carrier ${carrier.id} arrived.`)
    // クリア判定
    if (isCompleted.value) {
      terminate()
    }
  }
  /** シーンの終了時 */
  const terminate = async () => {
    actions.value.add('completed')
    console.log(`scene: completed, count ${count.value}`)
  }
  return {
    state,
    isPlaying,
    history,
    actions,
    hintText,
    count,
    stageSize,
    castWidth,
    originCasts,
    destinationCasts,
    isCompleted,
    load,
    unload,
    start,
    action,
    leave,
    arrive,
  }
})
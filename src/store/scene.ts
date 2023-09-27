// Puzzle Stage
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import useCarrier, { defaultStatus as defaultCarrierStatus } from '@/composable/use-carrier'
import useCast, { defaultStatus as defaultCastStatus } from '@/composable/use-cast'
import { Scene } from '@/types/scene'
import type { Cast } from '@/types/cast'
export const useSceneStore = defineStore('scene', () => {
  const state = useStorage<Scene>('RIVER_CROSSING_SCENE', {
    carriers: [],
    casts: [],
  }, sessionStorage)
  const init = async (
    config: Scene
  ) => {
    state.value = config
  }
  // 初期化
  const start = async () => {
    state.value.carriers.forEach(carrier => {
      Object.assign(carrier.status, {...defaultCarrierStatus})
    })
    state.value.casts.forEach(cast => {
      Object.assign(cast.status, {...defaultCastStatus})
    })
  }
  // 登場人物をスワイプ後の行動
  const action = async(
    cast: Cast,
    request: 'getOff' | 'getOn' | null
  ) => {
    console.log('scene: request', request, 'from cast', cast.id)  ////
    const { getOff, getOn } = useCast(cast)
    if(request === 'getOff') {
      // 登場人物を船から降ろす
      getOff()
      state.value.carriers.forEach(carrier =>
        carrier.status.passengers = carrier.status.passengers.filter(passenger => passenger !== cast)
      )
    } else if(request === 'getOn'){
      // 搭乗可能な乗り物があれば登場人物を船に乗せる
      if (boardableCarrier.value !== undefined) {
        boardableCarrier.value.status.passengers.push(cast)
        getOn()
      }
    }
  }
  // 搭乗可能な乗り物
  const boardableCarrier = computed(() => state.value.carriers.find(carrier => useCarrier(carrier).isBoardable.value))
  // 出発地点のキャラクター
  const originCasts = computed(() => state.value.casts.filter(cast => useCast(cast).location.value === 'origin'))
  // 到着地点のキャラクター
  const destinationCasts = computed(() => state.value.casts.filter(cast => useCast(cast).location.value === 'destination'))
  // すべての登場人物が対岸にいるかどうか
  const isCompleted = computed((): boolean => state.value.casts.every(cast => useCast(cast).location.value === 'destination'))
  return {
    state,
    init,
    start,
    action,
    boardableCarrier,
    originCasts,
    destinationCasts,
    isCompleted,
  }
})
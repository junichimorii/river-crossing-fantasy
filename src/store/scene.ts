import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { useCarrier, useCasts, useMoves, useScene } from '@/composables'
import type { Ref } from 'vue'
import type { Carrier } from '@/types/carrier'
import type { Cast } from '@/types/cast'
import type { Scene } from '@/types/scene'
import type { Move } from '@/types/moves'

/**
 * シーン（ステージ）管理
 */
export const useSceneStore = defineStore('scene', () => {
  /** シーンの設定・状態 */
  const state = ref<Scene>(
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
  )

  /** 乗り物 */
  const carriers = useStorage<Carrier[]>(
    'RIVER_CROSSING_CARRIERS',
    [],
    sessionStorage,
  )

  /** 登場人物 */
  const casts = useStorage<Cast[]>(
    'RIVER_CROSSING_CASTS',
    [],
    sessionStorage,
  )

  /** シーンの行動履歴 */
  const moves = useStorage<Set<Move>>(
    'RIVER_CROSSING_MOVES',
    new Set<Move>(),
    sessionStorage,
  )

  /** 操作の有効／無効 */
  const disabled = ref(false)

  const {
    init: initScene, getOn, getOff, leave, arrive,
    getPassengers, getDuration, getLoad, hasPassengers, isReady,
    unreachers, reachers, passengers, isPeaceable, isCrossed
  } = useScene(state)
  const { count } = useMoves(moves)

  /** シーンを読み込む */
  const load = async (
    config: Scene
  ) => {
    state.value = config
    moves.value = new Set<Move>()
  }

  /** シーンの状態を消去 */
  const unload = async () => {
    carriers.value = null
    casts.value = null
    moves.value = null
  }

  /**
   * シーンの状態を初期化
   */
  const init = async () => {
    await initScene()
    carriers.value = state.value.carriers
    casts.value = state.value.casts
    moves.value.clear()
  }

  return {
    state,
    moves,
    disabled,
    load,
    unload,
    init,
    getOn,
    getOff,
    leave,
    arrive,
    getPassengers,
    getDuration,
    getLoad,
    hasPassengers,
    isReady,
    unreachers,
    reachers,
    passengers,
    isPeaceable,
    isCrossed,
    count,
  }
})
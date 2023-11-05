import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { useCarrier, useCasts, useMoves, useScene } from '@/composables'
import type { Scene } from '@/types/scene'
import type { Move } from '@/types/moves'

/**
 * シーン（ステージ）管理
 */
export const useSceneStore = defineStore('scene', () => {
  /** シーンの設定・状態 */
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

  /** シーンの行動履歴 */
  const moves = useStorage<Set<Move>>(
    'RIVER_CROSSING_MOVES',
    new Set<Move>(),
    sessionStorage,
  )

  /** 操作の有効／無効 */
  const disabled = ref(false)

  const { init: initScene, getOn, getOff, leave, arrive } = useScene(state)
  const { getPassengers, getDuration, getLoad, hasPassengers, isReady } = useCarrier(state)
  const { unreachers, reachers, passengers, isCrossed } = useCasts(state)
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
    state.value = null
    moves.value = null
  }

  /**
   * シーンの状態を初期化
   */
  const init = async () => {
    await initScene()
    moves.value.clear()
  }

  return {
    state,
    moves,
    disabled,
    unreachers,
    reachers,
    passengers,
    isCrossed,
    count,
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
  }
})
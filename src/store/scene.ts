import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { useMoves, useScene } from '@/composables'
import type { Scene, State, Move } from '@/types'
import type { CarrierState, CastState } from '@/types/state'

/**
 * シーン（ステージ）管理
 */
export const useSceneStore = defineStore('scene', () => {

  /**
   * シーンの状態
   */
  const state = useStorage<State>(
    'RIVER_CROSSING_STATE',
    {
      carriers: [] as CarrierState[],
      casts: [] as CastState[],
    },
    sessionStorage,
  )

  /**
   * シーンの設定
   */
  const scene = useStorage<Scene>(
    'RIVER_CROSSING_SCENE',
    {
      id: 0,
      title: '',
      description: {
        conditions: '',
        transportation: '',
      },
      category: 'unconditioned',
      level: 0,
      passing: 0,
      carriers: [],
      casts: [],
    },
    sessionStorage,
  )

  /**
   * シーンの行動履歴
   */
  const moves = useStorage<Set<Move>>(
    'RIVER_CROSSING_MOVES',
    new Set<Move>(),
    sessionStorage,
  )

  /**
   * 操作の有効／無効
   */
  const disabled = ref(false)

  const { init: initScene } = useScene(state, scene)
  const { init: initMoves } = useMoves(moves)

  /**
   * シーンを読み込む
   */
  const load = async (
    config: Scene
  ) => {
    scene.value = config
    state.value = {
      carriers: [] as CarrierState[],
      casts: [] as CastState[],
    }
    moves.value = new Set<Move>()
  }

  /**
   * シーンの状態を消去
   */
  const unload = async () => {
    scene.value = null
    state.value = null
    moves.value = null
  }

  /**
   * シーンの状態を初期化
   */
  const init = async () => {
    await initScene()
    await initMoves()
  }

  return {
    state,
    scene,
    moves,
    disabled,
    load,
    unload,
    init,
  }
})
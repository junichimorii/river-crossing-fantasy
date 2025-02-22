import { useMoves, useScene } from '@/composables'
import type { CarrierState, CastState, Move, Scene, State } from '@/types'

/**
 * シーン（ステージ）管理
 */
export const useSceneStore = defineStore('scene', () => {
  /** シーンの状態 */
  const state = useStorage<State>(
    'RIVER_CROSSING_FANTASY_STATE',
    {
      carriers: [] as CarrierState[],
      casts: [] as CastState[],
    },
    sessionStorage,
  )

  /** シーンの行動履歴 */
  const moves = useStorage<Set<Move>>(
    'RIVER_CROSSING_FANTASY_MOVES',
    new Set<Move>(),
    sessionStorage,
  )

  /** シーンの設定 */
  const scene = ref<Scene>({
    id: 0,
    title: '',
    category: 0,
    order: 0,
    rules: {
      conditions: [],
      transportation: '',
    },
    passing: 0,
    carriers: [],
    casts: [],
  })

  /** 操作の有効／無効 */
  const disabled = ref(false)

  const { init: initScene } = useScene(state, scene)
  const { init: initMoves } = useMoves(moves)

  /** シーンを読み込む */
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

  /** シーンの状態を消去 */
  const unload = async () => {
    state.value = null
    moves.value = null
  }

  /** シーンの状態を初期化 */
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

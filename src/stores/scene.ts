import { useScene } from '@/composables'
import type { CarrierState, CastState, Move, Scene, State } from '@/types'
import { useRefHistory } from '@vueuse/core'

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

  const { history, undo } = useRefHistory(state)

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

  /** シーンの行動履歴 */
  const moves = ref(new Set<Move>())

  /** 操作の有効／無効 */
  const disabled = ref(false)

  const { init: initScene } = useScene(state, scene)

  /** シーンを読み込む */
  const load = async (
    config: Scene
  ) => {
    scene.value = config
    state.value = {
      carriers: [] as CarrierState[],
      casts: [] as CastState[],
    }
  }

  /** シーンの状態を消去 */
  const unload = async () => {
    state.value = null
  }

  /** シーンの状態を初期化 */
  const init = async () => {
    await initScene()
    moves.value.clear()
  }

  return {
    state,
    scene,
    moves,
    history,
    disabled,
    load,
    unload,
    init,
    undo,
  }
})

import type { Scene } from '@/types'
import * as _scenes from './scenes'

/**
 * 実績管理
 */
export const useRecordsStore = defineStore('records', () => {
  const state = ref({
    scenes: useStorage<Map<number, number>>(
      'RIVER_CROSSING_SCENES',
      new Map<number, number>()
    )
  })

  /**
   * シーン一覧
   */
  const scenes = computed(() => Object.values(_scenes))

  /**
   * 指定されたIDのシーンを読み込む
   */
  const load = async (
    id: number
  ) => {
    const config = scenes.value.find(scene => scene.id === id)
    return config
  }

  /**
   * 記録を消去する
   */
  const clear = async () => {
    state.value.scenes = new Map<number, number>()
  }

  /**
   * 各ステージをクリアした結果を格納する
   */
  const report = async (
    scene: Scene,
    score: number,
  ) => {
    state.value.scenes.set(scene.id, Math.max(getScore(scene.id), score))
  }

  /**
   * 次のステージIDを取得
   */
  const getNextSceneId = () => {
    const result = Math.max(...Array.from(state.value.scenes.keys())) + 1
    return result
  }

  /**
   * ステージのスコアの有無を取得
   */
  const isCleared = (
    id: number
  ) => state.value.scenes.has(id)

  /**
   * ステージのスコアを取得
   */
  const getScore = (
    id: number
  ) => state.value.scenes.get(id) || 0

  return {
    state,
    scenes,
    load,
    clear,
    report,
    getNextSceneId,
    isCleared,
    getScore,
  }
})

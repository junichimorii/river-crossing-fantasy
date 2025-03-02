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

  /** シーン一覧 */
  const scenes = computed(() => Object.values(_scenes))

  /** 記録があるかどうか */
  const isEmpty = computed(() => state.value.scenes.size === 0)

  /** 最後にクリアしたシーン */
  const latest = computed(() => Array.from(state.value.scenes.keys()).slice(-1)[0])

  /** 各ステージをクリアした結果を格納する */
  const report = async (
    scene: Scene,
    score: number,
  ) => {
    state.value.scenes.set(scene.id, Math.max(getScore(scene.id), score))
  }

  /** ステージのスコアの有無を取得 */
  const isCleared = (
    id: number
  ) => state.value.scenes.has(id)

  /** ステージのスコアを取得 */
  const getScore = (
    id: number
  ) => state.value.scenes.get(id) || 0

  return {
    state,
    scenes,
    isEmpty,
    latest,
    report,
    isCleared,
    getScore,
  }
})

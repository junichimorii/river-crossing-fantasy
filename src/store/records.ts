import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as scenes from './scenes'
import type { Scene } from '@/types'
const levels = [ '入門編', '初級編', '中級編', '上級編', '最上級編' ]
/**
 * 実績管理
 */
export const useRecordsStore = defineStore('records', () => {
  const state = ref({
    scenes: useStorage<Map<number, number>>(
      'RIVER_CROSSING_SCENES',
      new Map<number, number>()
    ),
    level: useStorage<Set<number>>(
      'RIVER_CROSSING_LEVEL',
      new Set<number>()
    )
  })

  /**
   * 指定されたIDのシーンを読み込む
   */
  const load = async (
    id: number
  ) => {
    const config = Object.values(scenes).find(scene => scene.id === id)
    return config
  }

  /**
   * 各ステージをクリアした結果を格納する
   */
  const report = async (
    scene: Scene,
    score: number,
  ) => {
    state.value.scenes.set(scene.id, Math.max(getScore(scene.id), score))
    if (isLevelCompleted(scene.level)) {
      state.value.level.add(scene.level + 1)
    }
  }

  /**
   * リスト表示のヘッダーを取得
   */
  const header = (
    id: number
  ) => {
    const current = Object.values(scenes).find(scene => scene.id === id)
    if(!current) throw false
    const previous = Object.values(scenes).find(scene => scene.id === id - 1)
    if(!previous) return levels[0]
    return current.level > previous.level
      ? levels[current.level - 1]
      : null
  }

  /**
   * ステージのスコアの有無を取得
   */
  const isCleared = (
    id: number
  ) => state.value.scenes.has(id)

  /**
   * 挑戦資格の有無を取得
   */
  const isQualified = (
    level: number
  ) => state.value.level.has(level)

  /**
   * ステージのスコアを取得
   */
  const getScore = (
    id: number
  ) => state.value.scenes.get(id) || 0

  /**
   * 同一レベルのステージをすべてクリアしたかどうか
   */
  const isLevelCompleted = (
    level: number
  ) => Object.values(scenes).filter(scene => scene.level === level).every(scene => isCleared(scene.id))

  return {
    state,
    scenes,
    load,
    report,
    header,
    isCleared,
    isQualified,
    getScore,
  }
})
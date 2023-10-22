import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import * as scenes from './scenes'
/**
 * 実績管理
 */
export const useRecordsStore = defineStore('records', () => {
  const state = ref({
    scenes: useStorage<Map<number, number>>(
      'RIVER_CROSSING_PUZZLES_SCENES',
      new Map<number, number>()
    ),
    splash: useStorage<boolean>(
      'RIVER_CROSSING_PUZZLES_SPLASH',
      false
    ),
  })

  /**
   * 指定されたIDのシーンを読み込む
   */
  const load = async (
    id: number
  ) => {
    const config = Object.values(scenes).find(scene => scene.id === id)
    if(!config) throw false
    return config
  }

  /**
   * 各ステージをクリアした結果を格納する
   */
  const report = async (
    id: number,
    score: number,
  ) => {
    set(id, Math.max(get(id), score))
    if (!has(id + 1)) {
      set(id + 1, 0)
    }
  }

  /**
   * ステージのスコアの有無を取得
   */
  const has = (
    id: number
  ) => state.value.scenes.has(id)

  /**
   * ステージのスコアを取得
   */
  const get = (
    id: number
  ) => state.value.scenes.get(id) || 0

  /**
   * ステージのスコアを格納
   */
  const set = (
    id: number,
    score: number,
  ) => state.value.scenes.set(id, score)

  return {
    state,
    scenes,
    load,
    report,
    has,
    get,
    set,
  }
})
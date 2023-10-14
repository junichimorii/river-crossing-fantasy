import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { Category, Activity } from '@/types/records'
import * as scenes from './scenes'
/**
 * 実績管理
 */
export const useRecordsStore = defineStore('records', () => {
  const state = ref({
    scenes: useStorage<Map<number, number>>('RIVER_CROSSING_PUZZLES_SCENES', new Map<number, number>()),
    categories: useStorage<Set<Category>>('RIVER_CROSSING_PUZZLES_CATEGORIES', new Set<Category>()),
    activities: useStorage<Set<Activity>>('RIVER_CROSSING_PUZZLES_ACTIVITIES', new Set<Activity>()),
  })
  /** 指定されたIDのシーンを読み込む */
  const load = async (
    id: number
  ) => {
    const config = Object.values(scenes).find(scene => scene.id === id)
    if(!config) throw false
    return config
  }
  /**  行動実績を獲得しているかどうか */
  const hasActivity = (
    activity: Activity
  ) => state.value.activities.has(activity)
  /**  各ステージをクリアした結果を格納する */
  const report = async (
    id: number,
    category: Category,
    score: number,
  ) => {
    const last = state.value.scenes.get(id) || 0
    state.value.scenes.set(id, Math.max(last, score))
    state.value.scenes.set(id + 1, 0)
    state.value.categories.add(category)
  }
  /**  行動実績を獲得する */
  const obtain = async (
    activity: Activity
  ) => {
    state.value.activities.add(activity)
  }
  return {
    state,
    scenes,
    load,
    hasActivity,
    report,
    obtain,
  }
})
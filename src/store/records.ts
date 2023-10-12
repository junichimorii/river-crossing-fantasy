import { computed, ref, Ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { Records, Category, Action } from '@/types/records'
import { s01, s02 } from './scenes'
/**
 * 実績管理
 */
export const useRecordsStore = defineStore('records', () => {
  const state = useStorage<Records>('RIVER_CROSSING_RECORDS', {
    scenes: new Map<number, number>([
      [1, 0]
    ]),
    categories: new Set<Category>(),
    actions: new Set<Action>(),
  })
  /** シーン一覧 */
  const scenes = [ s01, s02 ]
  /** 指定されたIDのシーンを読み込む */
  const load = async (
    id: number
  ) => {
    const config = scenes.find(scene => scene.id === id)
    if(!config) throw false
    console.log(`records: loaded scene ${id}`)
    return config
  }
  /**  各ステージをクリアした結果を格納する */
  const report = async (
    id: number,
    score: number,
  ) => {
    const last = state.value.scenes.get(id) || 0
    state.value.scenes.set(id, Math.max(last, score))
    state.value.scenes.set(id + 1, 0)
    console.log(`records: scene ${id}, score ${score}`)
  }
  /**  プレイしたパズル種別を格納する */
  const addCategories = async (
    categories: Category[]
  ) => {
    categories.forEach(category => {
      state.value.categories.add(category)
      console.log(`records: add category ${category}`)
    })
  }
  /**  行動実績を格納する */
  const addAction = async (
    action: Action
  ) => {
    state.value.actions.add(action)
    console.log(`records: add action ${action}`)
  }
  return {
    state,
    scenes,
    load,
    report,
    addCategories,
    addAction,
  }
})
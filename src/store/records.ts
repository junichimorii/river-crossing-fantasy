import { computed, ref, Ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { Records, Record } from '@/types/records'
import type { Scene } from '@/types/scene'
import { s01, s02 } from './scenes'
/**
 * 実績管理
 */
export const useRecordsStore = defineStore('records', () => {
  const state = useStorage<Records>('RIVER_CROSSING_RECORDS', {
    scenes: new Map<number, boolean>(),
    actions: new Set<Record>(),
  })
  /** シーン一覧 */
  const scenes = [ s01, s02 ]
  /** 指定されたIDのシーンを読み込む */
  const load = async (id: number) => {
    const config = scenes.find(scene => scene.id === id)
    if(!config) throw false
    console.log(`records: loaded scene ${id}`)
    return config
  }
  /**  各ステージをクリアした結果を格納する */
  const report = async (
    id: number,
    isCompleted: boolean,
  ) => {
    const last = state.value.scenes.get(id)
    state.value.scenes.set(id, last || isCompleted)
    console.log(`records: scene ${id} completed ${isCompleted}`)
  }
  /**  実績を格納する */
  const addRecord = async (
    record: Record
  ) => {
    state.value.actions.add(record)
    console.log(`records: add ${record}`)
  }
  return {
    state,
    scenes,
    load,
    report,
    addRecord,
  }
})
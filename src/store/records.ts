import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { Records, Record } from '@/types/records'
/**
 * 実績管理
 */
export const useRecordsStore = defineStore('records', () => {
  const state = useStorage<Records>('RIVER_CROSSING_RECORDS', {
    scenes: new Map(),
    actions: new Set<Record>(),
  })
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
    report,
    addRecord,
  }
})
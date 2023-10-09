import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { Records, Record } from '@/types/records'
import type { Scene } from '@/types/scene'
import { s01, s02 } from './scenes'
/**
 * 実績管理
 */
export const useRecordsStore = defineStore('records', () => {
  const state = useStorage<Records>('RIVER_CROSSING_RECORDS', {
    stage: 0,
    records: new Set<Record>(),
  })
  const now = ref(0)
  const scenes = [ s01, s02 ]
  /** 指定されたIDのシーンを読み込み */
  const load = async (id: string|string[]): Promise<Scene> => {
    if(Array.isArray(id)) throw false
    const scene = scenes.find(scene => scene.id === parseInt(id))
    if(!scene) throw false
    now.value = parseInt(id)
    return scene
  }
  const cleared = async (): Promise<void> => {
    state.value.stage = now.value
  }
  /**  実績解除 */
  const add = async (
    record: Record
  ) => {
    state.value.records.add(record)
    console.log(`records: set ${record}`)
  }
  return {
    state,
    scenes,
    load,
    cleared,
    add,
  }
})
// Puzzle Setting
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { Setting } from '@/types/setting'
import type { Scene } from '@/types/scene'
import { s01, s02 } from './scenes'
export const useSettingStore = defineStore('setting', () => {
  const state = useStorage<Setting>('RIVER_CROSSING_SETTING', {
    scene: 1,
    records: {
      started: false,
      swiped: false,
      gotOn: false,
      gotOnRower: false,
      leaved: false,
      arrived: false,
    }
  })
  const scenes = [ s01, s02 ]
  const load = async (id: string): Promise<Scene> => {
    const scene = scenes.find(scene => scene.id === parseInt(id))
    if(!scene) throw false
    return scene
  }
  const next = async (): Promise<void> => {
    state.value.scene++
  }
  return {
    state,
    scenes,
    load,
    next,
  }
})
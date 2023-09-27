// Puzzle Setting
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { Setting } from '@/types/setting'
import { Config } from '@/types/config'
import { s01 } from './scenes'
export const useSettingStore = defineStore('setting', () => {
  const state = useStorage<Setting>('RIVER_CROSSING_SETTING', {
    scene: 1
  })
  const scenes = [ s01 ]
  const load = async (): Promise<Config> => scenes[state.value.scene - 1]
  const next = async (): Promise<void> => {
    state.value.scene++
  }
  return {
    state,
    load,
    next,
  }
})
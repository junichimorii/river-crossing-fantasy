import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { Settings } from '@/types/settings'
export const useSettingsStore = defineStore('settings', () => {
  const state = useStorage<Settings>(
    'RIVER_CROSSING_SETTINGS',
    {
      splash: false,
    }
  )
  return {
    state,
  }
})
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import type { Session } from '@/types/session'
export const useSessionStore = defineStore('session', () => {
  const state = useStorage<Session>(
    'RIVER_CROSSING_SESSION',
    {
      introduction: false,
      drawer: false,
      navigation: 0,
      sound: false,
      solve: false,
    },
    sessionStorage,
  )
  return {
    state,
  }
})
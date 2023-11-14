import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { Session } from '@/types/session'
export const useSessionStore = defineStore('session', () => {
  const state = useStorage<Session>(
    'RIVER_CROSSING_SESSION',
    {
      introduction: false,
      drawer: false,
    },
    sessionStorage,
  )
  return {
    state,
  }
})
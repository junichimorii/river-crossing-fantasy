import type { Session } from '@/types'

/**
 * セッション管理
 */
export const useSessionStore = defineStore('session', () => {
  const state = useStorage<Session>(
    'RIVER_CROSSING_FANTASY_SESSION',
    {
      sound: false,
    },
    sessionStorage,
  )
  return {
    state,
  }
})

import type { Session } from '@/types'

/**
 * セッション管理
 */
export const useSessionStore = defineStore('session', () => {
  const state = useStorage<Session>(
    'RIVER_CROSSING_FANTASY_SESSION',
    {
      navigation: false,
      moves: false,
      sound: false,
      solve: false,
    },
    sessionStorage,
  )
  return {
    state,
  }
})

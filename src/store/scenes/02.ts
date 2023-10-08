import type { Scene } from '@/types/scene'
import { defaultStatus as defaultCarrierStatus } from '@/composables/use-carrier'
import { defaultStatus as defaultCastStatus } from '@/composables/use-cast'
const scene: Scene = {
  id: 2,
  title: '二人旅',
  description: {
    conditions: 'すべての登場人物が最小回数で対岸に渡る',
    transportation: '2人乗りのボートが1艘',
  },
  landscape: '/images/landscapes/daytime-river.png',
  carriers: [{
    id: 0,
    appearance: '/images/carriers/boat.png',
    capacity: 2,
    status: {...defaultCarrierStatus},
  }],
  casts: [{
    id: 0,
    avatar: '/images/casts/villager1.png',
    description: '旅人A',
    role: {
      canRow: true,
    },
    status: {...defaultCastStatus},
  }, {
    id: 1,
    avatar: '/images/casts/villager2.png',
    description: '旅人B',
    role: {
      canRow: true,
    },
    status: {...defaultCastStatus},
  }],
}
export default scene

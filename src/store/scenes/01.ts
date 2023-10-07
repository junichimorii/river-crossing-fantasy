import type { Scene } from '@/types/scene'
import { defaultStatus as defaultCarrierStatus } from '@/composable/use-carrier'
import { defaultStatus as defaultCastStatus } from '@/composable/use-cast'
const scene: Scene = {
  id: 1,
  title: '一人旅',
  description: {
    conditions: 'すべての登場人物が対岸に渡る',
    transportation: '1人乗りのボートが1艘',
  },
  landscape: '/images/landscapes/daytime-river.png',
  carriers: [{
    id: 0,
    appearance: '/images/carriers/boat.png',
    capacity: 1,
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
  }],
}
export default scene

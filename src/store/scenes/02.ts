import type { Scene } from '@/types/scene'
import { defaultStatus as defaultCarrierStatus } from '@/composable/use-carrier'
import { defaultStatus as defaultCastStatus } from '@/composable/use-cast'
const scene: Scene = {
  id: 2,
  title: '二人旅',
  landscape: '/images/landscapes/daytime-river.png',
  carriers: [{
    id: 0,
    capacity: 1,
    status: {...defaultCarrierStatus},
  }],
  casts: [{
    id: 0,
    avatar: '/images/casts/villager.png',
    role: {
      canRow: true,
    },
    status: {...defaultCastStatus},
  }, {
    id: 1,
    avatar: '/images/casts/villager.png',
    role: {
      canRow: true,
    },
    status: {...defaultCastStatus},
  }],
}
export default scene

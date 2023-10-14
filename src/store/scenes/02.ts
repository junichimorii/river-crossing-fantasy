import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 2,
  title: '二人旅',
  description: {
    conditions: 'すべての登場人物が最小回数で対岸に渡る',
    transportation: '2人乗りの舟が1艘',
  },
  category: 'doubleSeated',
  passing: 1,
  landscape: '/images/landscapes/daytime-river.png',
  carriers: [{
    id: 0,
    appearance: '/images/carriers/boat2.png',
    capacity: 2,
  }],
  casts: [{
    id: 0,
    avatar: '/images/casts/villager1.png',
    description: '旅人A',
    role: {
      canRow: true,
    },
  }, {
    id: 1,
    avatar: '/images/casts/villager2.png',
    description: '旅人B',
    role: {
      canRow: true,
    },
  }],
}) as Scene
export default scene

import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 3,
  title: '親子旅',
  description: {
    conditions: 'すべての登場人物が最小回数で対岸に渡る',
    transportation: '2人乗りの舟が1艘。ただし舟を漕げるのは母親のみ。',
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
    name: '母親',
    role: {
      canRow: true,
    },
  }, {
    id: 1,
    avatar: '/images/casts/villager2.png',
    name: '娘',
    role: {
      canRow: false,
    },
  }],
}) as Scene
export default scene

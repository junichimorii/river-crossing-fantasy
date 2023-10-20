import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 3,
  title: '親子旅(1)',
  description: {
    conditions: 'すべてのキャラクターが最小回数で対岸に渡る',
    transportation: '2人乗りの舟が1艘。ただし舟を漕げるのは母親のみ。',
  },
  tips: [
    '舟を移動させるボタンは、舟を漕げるキャラクターが乗っている時のみ表示されます。',
  ],
  category: 'qualified',
  passing: 3,
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
    name: '娘A',
    ratio: 0.85,
    role: {
      canRow: false,
    },
  }, {
    id: 2,
    avatar: '/images/casts/villager3.png',
    name: '娘B',
    ratio: 0.85,
    role: {
      canRow: false,
    },
  }],
}) as Scene
export default scene

import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 3,
  title: '逃避行(1)',
  description: {
    conditions: 'すべてのキャラクターを最小回数で対岸に渡す',
    transportation: '2人乗りの舟が1艘。ただし舟を漕げるのは騎士のみ。',
  },
  tips: [
    '舟を漕げるキャラクターと漕げないキャラクターがいます。',
    '舟を移動させるボタンは、舟を漕げるキャラクターが乗っている時のみ表示されます。',
  ],
  category: 'qualified',
  landscape: '/images/landscapes/daytime-river.png',
  passing: 3,
  carriers: [{
    id: 0,
    appearance: '/images/carriers/boat2.png',
    capacity: 2,
  }],
  casts: [{
    id: 0,
    avatar: '/images/casts/knight-a1.png',
    name: '騎士',
    role: {
      canRow: true,
    },
  }, {
    id: 1,
    avatar: '/images/casts/princess-a1.png',
    name: '王女A',
    ratio: 0.85,
    role: {
      canRow: false,
    },
  }, {
    id: 2,
    avatar: '/images/casts/princess-a2.png',
    name: '王女B',
    ratio: 0.85,
    role: {
      canRow: false,
    },
  }],
}) as Scene
export default scene

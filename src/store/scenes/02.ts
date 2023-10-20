import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 2,
  title: '三人旅',
  description: {
    conditions: 'すべてのキャラクターが最小回数で対岸に渡る',
    transportation: '2人乗りの舟が1艘。すべてのキャラクターが舟を漕げる。',
  },
  tips: [
    '舟には定員を超えない範囲で何人でも乗せることができます。',
    '対岸のキャラクターを舟に乗せる時は、下方向にスワイプします。',
  ],
  category: 'unconditioned',
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
    name: '旅人A',
    role: {
    },
  }, {
    id: 1,
    avatar: '/images/casts/villager2.png',
    name: '旅人B',
    role: {
    },
  }, {
    id: 2,
    avatar: '/images/casts/villager3.png',
    name: '旅人C',
    role: {
    },
  }],
}) as Scene
export default scene

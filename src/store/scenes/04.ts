import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 4,
  title: '逃避行(2)',
  description: {
    conditions: 'すべてのキャラクターを最小回数で対岸に渡す',
    transportation: '2人乗りの舟が1艘。ただし騎士の重量は定員2人分。すべてのキャラクターが舟を漕げる。',
  },
  tips: [
    '舟には、定員の他に重量制限がある場合があります。重量オーバーの状態で舟を移動させることはできません。',
  ],
  category: 'weight-limited',
  landscape: '/images/landscapes/daytime-river.png',
  passing: 9,
  carriers: [{
    id: 0,
    appearance: '/images/carriers/boat2.png',
    capacity: 2,
    weightLimit: 2,
  }],
  casts: [{
    id: 0,
    avatar: '/images/casts/knight-b1.png',
    name: '騎士A',
    role: {
      weight: 2,
    },
  }, {
    id: 1,
    avatar: '/images/casts/knight-b2.png',
    name: '騎士B',
    role: {
      weight: 2,
    },
  }, {
    id: 2,
    avatar: '/images/casts/villager1.png',
    name: '村人A',
    role: {
      weight: 1,
    },
  }, {
    id: 3,
    avatar: '/images/casts/villager2.png',
    name: '村人B',
    role: {
      weight: 1,
    },
  }],
}) as Scene
export default scene

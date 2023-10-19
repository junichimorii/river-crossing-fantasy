import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 4,
  title: '親子旅(2)',
  description: {
    conditions: 'すべての登場人物が最小回数で対岸に渡る',
    transportation: '2人乗りの舟が1艘。ただし重量制限は大人1人分。',
  },
  tips: [
    '舟には、定員の他に重量制限がある場合があります。重量オーバーの状態で舟を移動させることはできません。',
  ],
  category: 'tutorial',
  passing: 9,
  landscape: '/images/landscapes/daytime-river.png',
  carriers: [{
    id: 0,
    appearance: '/images/carriers/boat2.png',
    capacity: 2,
    weightLimit: 1,
  }],
  casts: [{
    id: 0,
    avatar: '/images/casts/villager1.png',
    name: '母親A',
    role: {
      canRow: true,
      weight: 1,
    },
  }, {
    id: 1,
    avatar: '/images/casts/villager2.png',
    name: '母親B',
    role: {
      canRow: true,
      weight: 1,
    },
  }, {
    id: 2,
    avatar: '/images/casts/villager3.png',
    name: '娘A',
    ratio: 0.85,
    role: {
      canRow: true,
      weight: 0.5,
    },
  }, {
    id: 3,
    avatar: '/images/casts/villager4.png',
    name: '娘B',
    ratio: 0.85,
    role: {
      canRow: true,
      weight: 0.5,
    },
  }],
}) as Scene
export default scene

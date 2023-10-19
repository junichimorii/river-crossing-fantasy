import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 6,
  title: 'オオカミとヤギとキャベツ',
  description: {
    conditions: 'すべての登場人物が最小回数で対岸に渡る',
    transportation: '2人乗りの舟が1艘。ただし舟を漕げるのは農民のみ。',
  },
  category: 'wolfGoatAndCabbage',
  passing: 7,
  landscape: '/images/landscapes/daytime-river.png',
  carriers: [{
    id: 0,
    appearance: '/images/carriers/boat2.png',
    capacity: 2,
  }],
  casts: [{
    id: 0,
    avatar: '/images/casts/farmer1.png',
    name: '農民',
    role: {
      canRow: true,
    },
  }, {
    id: 1,
    avatar: '/images/casts/wolf1.png',
    name: 'オオカミ',
    description: '農民が目を離すとヤギを食べる。',
    role: {
      canRow: false,
    },
  }, {
    id: 2,
    avatar: '/images/casts/goat1.png',
    name: 'ヤギ',
    description: '農民が目を離すとキャベツを食べる。',
    role: {
      canRow: false,
      enemies: [1],
      guardian: 0,
    },
  }, {
    id: 3,
    avatar: '/images/casts/cabbage1.png',
    name: 'キャベツ',
    description: '',
    role: {
      canRow: false,
      enemies: [2],
      guardian: 0,
    },
  }],
}) as Scene
export default scene

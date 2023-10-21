import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 9,
  title: '宣教師と先住民(1)',
  description: {
    conditions: 'すべての地点で宣教師側が半数以上を維持しつつ、すべてのキャラクターが最小回数で対岸に渡る',
    transportation: '2人乗りの舟が1艘。すべてのキャラクターが舟を漕げる。',
  },
  tips: [
    '両岸および舟の上において、先住民の数が宣教師の数の過半数となった場合、先住民が反逆を起こします。',
    'いずれかのキャラクターが危機に瀕している状況で舟を移動させることはできません。',
  ],
  category: 'keep-majority',
  passing: 11,
  landscape: '/images/landscapes/daytime-river.png',
  carriers: [{
    id: 0,
    appearance: '/images/carriers/boat2.png',
    capacity: 2,
  }],
  casts: [{
    id: 0,
    avatar: '/images/casts/farmer1.png',
    name: '宣教師',
    role: {
      rebel: false,
    },
  }, {
    id: 1,
    avatar: '/images/casts/farmer1.png',
    name: '宣教師',
    role: {
      rebel: false,
    },
  }, {
    id: 2,
    avatar: '/images/casts/therianthropy1.png',
    name: '獣人',
    role: {
      rebel: true,
    },
  }, {
    id: 3,
    avatar: '/images/casts/therianthropy1.png',
    name: '獣人',
    role: {
      rebel: true,
    },
  }],
}) as Scene
export default scene

import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 12,
  title: '魔獣使いの苦悩（中級編）',
  description: {
    conditions: '両岸で魔獣使い側が半数以上を維持しつつ、すべてのキャラクターを最小回数で対岸に渡す',
    transportation: '2人乗りの舟が1艘。すべてのキャラクターが舟を漕げる。',
  },
  tips: [
    '古くから「missionaries and cannibals problem」（宣教師と先住民）の名で知られる川渡りパズルを改変したもの。',
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
    avatar: '/images/casts/beast-tamer1.png',
    name: '魔獣使いA',
    role: {
      rebel: false,
    },
  }, {
    id: 1,
    avatar: '/images/casts/beast-tamer2.png',
    name: '魔獣使いB',
    role: {
      rebel: false,
    },
  }, {
    id: 2,
    avatar: '/images/casts/beast-tamer3.png',
    name: '魔獣使いC',
    role: {
      rebel: false,
    },
  }, {
    id: 3,
    avatar: '/images/casts/therianthropy1.png',
    name: '魔獣A',
    role: {
      rebel: true,
    },
  }, {
    id: 4,
    avatar: '/images/casts/therianthropy2.png',
    name: '魔獣B',
    role: {
      rebel: true,
    },
  }, {
    id: 5,
    avatar: '/images/casts/therianthropy3.png',
    name: '魔獣C',
    role: {
      rebel: true,
    },
  }],
}) as Scene
export default scene

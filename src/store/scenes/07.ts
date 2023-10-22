import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 7,
  title: '魔獣と魔獣使い(1)',
  description: {
    conditions: 'すべての地点で魔獣使い側が半数以上を維持しつつ、すべてのキャラクターが最小回数で対岸に渡る',
    transportation: '2人乗りの舟が1艘。すべてのキャラクターが舟を漕げる。',
  },
  tips: [
    '両岸および舟の上において、魔獣の数が魔獣使いの数の過半数となった場合、魔獣が反逆を起こします。',
    'いずれかのキャラクターが危機に瀕している状況で舟を移動させることはできません。',
    '岸への到着時、魔獣使いが危機を回避できない場合はその時点でクリア失敗となります。',
  ],
  category: 'keep-majority',
  passing: 5,
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
    avatar: '/images/casts/therianthropy1.png',
    name: '魔獣A',
    role: {
      rebel: true,
    },
  }, {
    id: 3,
    avatar: '/images/casts/therianthropy2.png',
    name: '魔獣B',
    role: {
      rebel: true,
    },
  }],
}) as Scene
export default scene

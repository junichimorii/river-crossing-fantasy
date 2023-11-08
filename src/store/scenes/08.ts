import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 8,
  title: '魔獣使いの苦悩（初級編）',
  description: {
    conditions: '両岸で魔獣使い側が半数以上を維持しつつ、すべてのキャラクターを最小回数で対岸に渡す',
    transportation: '2人乗りの舟が1艘。すべてのキャラクターが舟を漕げる。',
  },
  tips: [
    '両岸において、魔獣の数が魔獣使いの数の過半数となった場合、魔獣が反逆を起こします。',
    'いずれかのキャラクターが危機に瀕している状況で舟を移動させることはできません。',
    '岸への到着時、魔獣使いが危機を回避できない場合はその時点でクリア失敗となります。',
  ],
  category: 'keep-majority',
  landscape: '/images/landscapes/daytime-river.png',
  passing: 5,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: {
      sprite: '/images/carriers/boat2.png'
    }
  }],
  casts: [{
    id: 0,
    name: '魔獣使いA',
    appearance: {
      sprite: '/images/casts/beast-tamer1.png'
    },
    role: {
      rebel: false,
    }
  }, {
    id: 1,
    name: '魔獣使いB',
    appearance: {
      sprite: '/images/casts/beast-tamer2.png'
    },
    role: {
      rebel: false,
    }
  }, {
    id: 2,
    name: '魔獣A',
    appearance: {
      sprite: '/images/casts/therianthropy1.png'
    },
    role: {
      rebel: true,
    }
  }, {
    id: 3,
    name: '魔獣B',
    appearance: {
      sprite: '/images/casts/therianthropy2.png'
    },
    role: {
      rebel: true,
    }
  }]
})
export default scene

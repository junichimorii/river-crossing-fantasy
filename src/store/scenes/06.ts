import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 6,
  title: '魔獣たちの反乱（初級編）',
  description: {
    conditions: '両岸で魔獣使い側が半数以上を維持しつつ、すべての登場人物を最小回数で対岸に渡す',
    transportation: '2人乗りの舟が1<ruby>艘<rt>そう</rt></ruby>。すべての登場人物が舟を<ruby>漕<rt>こ</rt></ruby>げる。',
    tips: [
      '魔獣使い側が半数以上を維持しつつ川を渡るパズルです。',
      '両岸において、魔獣の数が魔獣使いの数より多くなった場合、魔獣が反乱を起こします。',
      '岸への到着時、魔獣使いが危機を回避できない場合はその時点でクリア失敗となります。',
    ],
  },
  category: 'keep-majority',
  level: 2,
  passing: 5,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: {
      sprite: 'boat2'
    }
  }],
  casts: [{
    id: 0,
    name: '魔獣使いA',
    appearance: {
      sprite: 'beasttamer1'
    },
    role: {
      rebel: false,
    }
  }, {
    id: 1,
    name: '魔獣使いB',
    appearance: {
      sprite: 'beasttamer2'
    },
    role: {
      rebel: false,
    }
  }, {
    id: 2,
    name: '魔獣A',
    appearance: {
      sprite: 'therianthropy1'
    },
    role: {
      rebel: true,
    }
  }, {
    id: 3,
    name: '魔獣B',
    appearance: {
      sprite: 'therianthropy2'
    },
    role: {
      rebel: true,
    }
  }]
})
export default scene

import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 10,
  title: '魔獣たちの反乱（初級編）',
  level: 2,
  category: 'keep-majority',
  rules: {
    conditions: [
      '両岸で魔獣使い側が半数以上を維持しつつ、すべての登場人物を対岸に渡す',
      '5回以内にクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。すべての登場人物が筏（いかだ）を漕（こ）げる。',
    tips: [
      '魔獣使い側が半数以上を維持しつつ川を渡るパズルです。',
      '両岸において、魔獣の数が魔獣使いの数より多くなった場合、魔獣が反乱を起こします。',
      '岸への到着時、魔獣使いが危機を回避できない場合はその時点でクリア失敗となります。',
    ],
  },
  passing: 5,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: {
      sprite: 'raft2'
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

import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 10,
  title: '魔獣たちの反乱(1)',
  category: 4,
  order: 1,
  rules: {
    conditions: [
      '両岸で魔獣使い側が半数以上を維持しつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。すべての登場人物が筏（いかだ）を漕（こ）げる。',
    tips: [
      '魔獣使い側が半数以上を維持しつつ川を渡るパズルです。',
      '両岸において、**魔獣の数が魔獣使いの数より多くなった場合、魔獣が反乱を起こします**。',
      '岸への到着時、魔獣使いが危機を回避できない場合はその時点でクリア失敗となります。',
    ],
  },
  passing: 5,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: 'raft2'
  }],
  casts: [{
    id: 0,
    name: '魔獣使いA',
    appearance: 'beasttamer1',
    role: {
      rower: true,
      rebel: false,
    }
  }, {
    id: 1,
    name: '魔獣使いB',
    appearance: 'beasttamer2',
    role: {
      rower: true,
      rebel: false,
    }
  }, {
    id: 2,
    name: '魔獣A',
    description: '魔獣使いの数より多くなると反乱を起こす。',
    appearance: 'therianthropy1',
    role: {
      rower: true,
      rebel: true,
    }
  }, {
    id: 3,
    name: '魔獣B',
    description: '魔獣使いの数より多くなると反乱を起こす。',
    appearance: 'therianthropy2',
    role: {
      rower: true,
      rebel: true,
    }
  }]
})
export default scene

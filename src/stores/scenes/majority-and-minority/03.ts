import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 22,
  title: '魔獣たちの反乱(3)',
  category: 4,
  order: 3,
  rules: {
    conditions: [
      '両岸で魔獣使い側が半数以上を維持しつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。ただし筏（いかだ）を漕（こ）げるのは魔獣使いAと魔獣Aのみ。',
    tips: [
      '「魔獣たちの反乱(2)」とよく似ていますが、筏（いかだ）を漕（こ）げる登場人物が限定されています。',
    ],
  },
  passing: 13,
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
      rebel: false
    }
  }, {
    id: 1,
    name: '魔獣使いb',
    appearance: 'beasttamer2',
    role: {
      rower: false,
      rebel: false
    }
  }, {
    id: 2,
    name: '魔獣使いc',
    appearance: 'beasttamer3',
    role: {
      rower: false,
      rebel: false
    }
  }, {
    id: 3,
    name: '魔獣A',
    description: '魔獣使いの数より多くなると反乱を起こす。',
    appearance: 'therianthropy1',
    role: {
      rower: true,
      rebel: true
    }
  }, {
    id: 4,
    name: '魔獣b',
    description: '魔獣使いの数より多くなると反乱を起こす。',
    appearance: 'therianthropy2',
    role: {
      rower: false,
      rebel: true
    }
  }, {
    id: 5,
    name: '魔獣c',
    description: '魔獣使いの数より多くなると反乱を起こす。',
    appearance: 'therianthropy3',
    role: {
      rower: false,
      rebel: true
    }
  }]
})
export default scene

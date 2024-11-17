import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 75,
  title: '魔獣たちの反乱+(2)',
  category: 95,
  order: 4,
  rules: {
    conditions: [
      '両岸および中州の上で魔獣使い側が半数以上を維持しつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。ただし筏（いかだ）を漕（こ）げるのは魔獣使いAと魔獣Aのみ。川の中の島に降りることもできる。',
    tips: [
      '川の中間にある中州に降りることができます。',
      '「魔獣たちの反乱+(1)」とよく似ていますが、筏（いかだ）を漕（こ）げる登場人物が限定されています。',
    ],
  },
  landscape: {
    island: true
  },
  passing: 26,
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
    name: '魔獣使いd',
    appearance: 'beasttamer4',
    role: {
      rower: false,
      rebel: false
    }
  }, {
    id: 4,
    name: '魔獣A',
    appearance: 'therianthropy1',
    role: {
      rower: true,
      rebel: true
    }
  }, {
    id: 5,
    name: '魔獣b',
    appearance: 'therianthropy2',
    role: {
      rower: false,
      rebel: true
    }
  }, {
    id: 6,
    name: '魔獣c',
    appearance: 'therianthropy3',
    role: {
      rower: false,
      rebel: true
    }
  }, {
    id: 7,
    name: '魔獣d',
    appearance: 'therianthropy4',
    role: {
      rower: false,
      rebel: true
    }
  }]
})
export default scene

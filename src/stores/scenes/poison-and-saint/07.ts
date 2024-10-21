import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 83,
  title: '聖女は毒を浄化する(7)',
  category: 60,
  order: 7,
  rules: {
    conditions: [
      '毒による状態異常に注意しつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。ただし筏（いかだ）を漕（こ）げるのは聖女以外。',
    tips: [
      '聖女が4人登場します。',
    ],
  },
  landscape: {
    poison: true
  },
  passing: 13,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: 'raft2'
  }],
  casts: [{
    id: 0,
    name: '戦士',
    appearance: 'fighter1',
    role: {
      rower: true
    }
  }, {
    id: 1,
    name: '盗賊',
    appearance: 'thief1',
    role: {
      rower: true
    }
  }, {
    id: 2,
    name: '魔法使い',
    appearance: 'wizard1',
    role: {
      rower: true
    }
  }, {
    id: 3,
    name: '聖女a',
    appearance: 'priest1',
    role: {
      rower: false,
      saint: true
    }
  }, {
    id: 4,
    name: '聖女b',
    appearance: 'priest2',
    role: {
      rower: false,
      saint: true
    }
  }, {
    id: 5,
    name: '聖女c',
    appearance: 'priest3',
    role: {
      rower: false,
      saint: true
    }
  }, {
    id: 6,
    name: '聖女d',
    appearance: 'priest4',
    role: {
      rower: false,
      saint: true
    }
  }]
})
export default scene

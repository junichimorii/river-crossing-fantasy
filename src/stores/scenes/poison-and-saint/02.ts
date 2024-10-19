import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 78,
  title: '聖女は毒を浄化する(2)',
  category: 7,
  order: 2,
  rules: {
    conditions: [
      '毒による状態異常に注意しつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。ただし筏（いかだ）を漕（こ）げるのは聖女以外。',
    tips: [
      '毒に侵されている登場人物も、**聖女が同乗している場合は筏（いかだ）を漕（こ）ぐことができます。**',
      'また、渡河中に**状態異常が回復します**。',
    ],
  },
  landscape: {
    poison: true
  },
  passing: 5,
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
    name: '聖女a',
    appearance: 'priest1',
    role: {
      rower: false,
      saint: true
    }
  }, {
    id: 3,
    name: '聖女b',
    appearance: 'priest2',
    role: {
      rower: false,
      saint: true
    }
  }]
})
export default scene

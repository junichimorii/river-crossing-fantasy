import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 81,
  title: '聖女は毒を浄化する(5)',
  category: 60,
  order: 5,
  rules: {
    conditions: [
      '毒による状態異常に注意しつつ、すべての登場人物を対岸に渡す',
    ],
    transportation: '筏（いかだ）を漕（こ）げるのは聖女と村人以外。',
    tips: [
      '「聖女は毒を浄化する(4)」と似ていますが、筏（いかだ）を漕（こ）げない登場人物が増えています。',
    ],
  },
  landscape: {
    poison: true
  },
  passing: 11,
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
    name: '村人',
    appearance: 'villager1',
    role: {
      rower: false
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
  }]
})
export default scene

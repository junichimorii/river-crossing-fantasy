import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 84,
  title: '聖女は毒を浄化する(8)',
  category: 60,
  order: 8,
  rules: {
    conditions: [
      '毒による状態異常に注意しつつ、すべての登場人物を対岸に渡す',
    ],
    transportation: '筏（いかだ）を漕（こ）げるのは聖女以外。',
    tips: [
      '筏（いかだ）の定員は3名です。',
    ],
  },
  landscape: {
    poison: true
  },
  passing: 7,
  carriers: [{
    id: 0,
    capacity: 3,
    appearance: 'raft3'
  }],
  casts: [{
    id: 0,
    name: '騎士A',
    appearance: 'knight1',
    role: {
      rower: true
    }
  }, {
    id: 1,
    name: '騎士B',
    appearance: 'knight2',
    role: {
      rower: true
    }
  }, {
    id: 2,
    name: '騎士C',
    appearance: 'knight3',
    role: {
      rower: true
    }
  }, {
    id: 3,
    name: '騎士D',
    appearance: 'knight4',
    role: {
      rower: true
    }
  }, {
    id: 4,
    name: '騎士E',
    appearance: 'knight5',
    role: {
      rower: true
    }
  }, {
    id: 5,
    name: '聖女a',
    appearance: 'priest1',
    role: {
      rower: false,
      saint: true
    }
  }, {
    id: 6,
    name: '聖女b',
    appearance: 'priest2',
    role: {
      rower: false,
      saint: true
    }
  }, {
    id: 7,
    name: '聖女c',
    appearance: 'priest3',
    role: {
      rower: false,
      saint: true
    }
  }, {
    id: 8,
    name: '聖女d',
    appearance: 'priest4',
    role: {
      rower: false,
      saint: true
    }
  }]
})
export default scene

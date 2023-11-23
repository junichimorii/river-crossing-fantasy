import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 3,
  title: '逃避行',
  level: 1,
  category: 'qualified',
  rules: {
    conditions: [
      'すべての登場人物を対岸に渡す',
      '3回以内にクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。ただし筏（いかだ）を漕（こ）げるのは騎士のみ。',
    tips: [
      '登場人物には、筏（いかだ）を漕（こ）げる者と漕（こ）げない者がいます。',
      '筏（いかだ）を移動させるボタンは、筏（いかだ）を漕（こ）げる登場人物が乗っている時のみ表示されます。',
    ],
  },
  passing: 3,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: {
      sprite: 'raft2'
    }
  }],
  casts: [{
    id: 0,
    name: '騎士',
    appearance: {
      sprite: 'knight11',
    },
    role: {
      rower: true,
    }
  }, {
    id: 1,
    name: '王女a',
    appearance: {
      sprite: 'princess11',
      ratio: 0.85
    },
    role: {
      rower: false,
    }
  }, {
    id: 2,
    name: '王女b',
    appearance: {
      sprite: 'princess12',
      ratio: 0.85
    },
    role: {
      rower: false,
    }
  }]
})
export default scene

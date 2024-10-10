import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 3,
  title: '逃避行(1)',
  category: 0,
  order: 3,
  level: 1,
  rules: {
    conditions: [
      'すべての登場人物を対岸に渡す',
      '3回以内にクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。ただし筏（いかだ）を漕（こ）げるのは騎士のみ。',
    tips: [
      '登場人物には様々な個性があります。今回は、**筏（いかだ）を漕（こ）げる者と漕（こ）げない者**が登場します。',
      '筏（いかだ）を移動させるボタンは、筏（いかだ）を漕（こ）げる登場人物が乗っている時のみ表示されます。',
    ],
  },
  passing: 3,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: 'raft2'
  }],
  casts: [{
    id: 0,
    name: '騎士',
    appearance: 'knight11',
    role: {
      rower: true,
    }
  }, {
    id: 1,
    name: '王女a',
    appearance: 'princess11',
    role: {
      rower: false,
    }
  }, {
    id: 2,
    name: '王女b',
    appearance: 'princess12',
    role: {
      rower: false,
    }
  }]
})
export default scene

import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 36,
  title: '逃避行(2)',
  category: 0,
  order: 4,
  level: 1,
  rules: {
    conditions: [
      'すべての登場人物を対岸に渡す',
      '3回以内にクリアする'
    ],
    transportation: '3人乗りの筏（いかだ）が1艘（そう）。ただし筏（いかだ）を漕（こ）げるのは司祭のみ。',
    tips: [
      '3人乗りの筏（いかだ）が登場するケースがあります。1度に3人まで乗せることができます。',
      'もちろん、筏（いかだ）を漕（こ）げる人物が少なくとも1人乗っていないと、筏（いかだ）を移動させることはできません。',
    ],
  },
  passing: 3,
  carriers: [{
    id: 0,
    capacity: 3,
    appearance: 'raft3'
  }],
  casts: [{
    id: 0,
    name: '司祭',
    appearance: 'priest1',
    role: {
      rower: true,
    }
  }, {
    id: 1,
    name: '青国王女',
    appearance: 'princess11',
    role: {
      rower: false,
    }
  }, {
    id: 2,
    name: '赤国王女',
    appearance: 'princess21',
    role: {
      rower: false,
    }
  }, {
    id: 3,
    name: '緑国王女',
    appearance: 'princess31',
    role: {
      rower: false,
    }
  }, {
    id: 4,
    name: '紫国王女',
    appearance: 'princess41',
    role: {
      rower: false,
    }
  }]
})
export default scene

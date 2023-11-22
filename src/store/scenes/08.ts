import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 8,
  title: '逃避行（初級編1）',
  rules: {
    conditions: [
      'すべての登場人物を対岸に渡す',
      '5回以内にクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。ただし騎士の重量は定員2人分。すべての登場人物が筏（いかだ）を漕（こ）げる。',
    tips: [
      '筏（いかだ）には、定員の他に重量制限が設定されている場合があります。重量オーバーの状態で筏（いかだ）を移動させることはできません。',
    ],
  },
  category: 'weight-limited',
  level: 2,
  passing: 5,
  carriers: [{
    id: 0,
    capacity: 2,
    weightLimit: 2,
    appearance: {
      sprite: 'raft2'
    }
  }],
  casts: [{
    id: 0,
    name: '騎士A',
    appearance: {
      sprite: 'knight21',
    },
    role: {
      weight: 2,
    },
  }, {
    id: 1,
    name: '村人A',
    appearance: {
      sprite: 'villager1'
    },
    role: {
      weight: 1
    }
  }, {
    id: 2,
    name: '村人B',
    appearance: {
      sprite: 'villager2'
    },
    role: {
      weight: 1
    }
  }]
})
export default scene

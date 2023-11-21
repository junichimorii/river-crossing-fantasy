import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 8,
  title: '逃避行（初級編1）',
  description: {
    conditions: 'すべての登場人物を最小回数で対岸に渡す',
    transportation: '2人乗りの<ruby>筏<rt>いかだ</rt></ruby>が1<ruby>艘<rt>そう</rt></ruby>。ただし騎士の重量は定員2人分。すべての登場人物が<ruby>筏<rt>いかだ</rt></ruby>を<ruby>漕<rt>こ</rt></ruby>げる。',
    tips: [
      '<ruby>筏<rt>いかだ</rt></ruby>には、定員の他に重量制限が設定されている場合があります。重量オーバーの状態で<ruby>筏<rt>いかだ</rt></ruby>を移動させることはできません。',
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

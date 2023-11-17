import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 4,
  title: '逃避行（入門編2）',
  description: {
    conditions: 'すべての登場人物を最小回数で対岸に渡す',
    transportation: '2人乗りの舟が1<ruby>艘<rt>そう</rt></ruby>。ただし騎士の重量は定員2人分。すべての登場人物が舟を<ruby>漕<rt>こ</rt></ruby>げる。',
    tips: [
      '舟には、定員の他に重量制限が設定されている場合があります。重量オーバーの状態で舟を移動させることはできません。',
    ],
  },
  category: 'weight-limited',
  level: 1,
  passing: 5,
  carriers: [{
    id: 0,
    capacity: 2,
    weightLimit: 2,
    appearance: {
      sprite: '/images/carriers/boat2.png'
    }
  }],
  casts: [{
    id: 0,
    name: '騎士A',
    appearance: {
      sprite: '/images/casts/knight-b1.png',
    },
    role: {
      weight: 2,
    },
  }, {
    id: 1,
    name: '村人A',
    appearance: {
      sprite: '/images/casts/villager1.png'
    },
    role: {
      weight: 1
    }
  }, {
    id: 2,
    name: '村人B',
    appearance: {
      sprite: '/images/casts/villager2.png'
    },
    role: {
      weight: 1
    }
  }]
})
export default scene

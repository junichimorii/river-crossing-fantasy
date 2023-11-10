import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 2,
  title: '三人旅',
  description: {
    conditions: 'すべてのキャラクターを最小回数で対岸に渡す',
    transportation: '2人乗りの舟が1艘。すべてのキャラクターが舟を漕げる。',
    tips: [
      '舟には定員を超えない範囲で何人でも乗せることができます。',
      '対岸のキャラクターを舟に乗せる時は、下方向にスワイプします。',
    ],
  },
  category: 'unconditioned',
  landscape: '/images/landscapes/daytime-river.png',
  passing: 3,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: {
      sprite: '/images/carriers/boat2.png'
    }
  }],
  casts: [{
    id: 0,
    name: '戦士',
    appearance: {
      sprite: '/images/casts/fighter1.png'
    },
    role: {
    }
  }, {
    id: 1,
    name: '盗賊',
    appearance: {
      sprite: '/images/casts/thief1.png'
    },
    role: {
    }
  }, {
    id: 2,
    name: '魔法使い',
    appearance: {
      sprite: '/images/casts/mage1.png'
    },
    role: {
    }
  }]
})
export default scene

import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 2,
  title: '三人旅',
  description: {
    conditions: 'すべてのキャラクターを最小回数で対岸に渡す',
    transportation: '2人乗りの舟が1艘。すべてのキャラクターが舟を漕げる。',
  },
  tips: [
    '舟には定員を超えない範囲で何人でも乗せることができます。',
    '対岸のキャラクターを舟に乗せる時は、下方向にスワイプします。',
  ],
  category: 'unconditioned',
  landscape: '/images/landscapes/daytime-river.png',
  passing: 3,
  carriers: [{
    id: 0,
    appearance: '/images/carriers/boat2.png',
    capacity: 2,
  }],
  casts: [{
    id: 0,
    avatar: '/images/casts/fighter1.png',
    name: '戦士',
    role: {
    },
  }, {
    id: 1,
    avatar: '/images/casts/thief1.png',
    name: '盗賊',
    role: {
    },
  }, {
    id: 2,
    avatar: '/images/casts/mage1.png',
    name: '魔法使い',
    role: {
    },
  }],
}) as Scene
export default scene

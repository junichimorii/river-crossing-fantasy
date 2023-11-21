import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 2,
  title: '三人旅',
  description: {
    conditions: 'すべての登場人物を最小回数で対岸に渡す',
    transportation: '2人乗りの<ruby>筏<rt>いかだ</rt></ruby>が1<ruby>艘<rt>そう</rt></ruby>。すべての登場人物が<ruby>筏<rt>いかだ</rt></ruby>を<ruby>漕<rt>こ</rt></ruby>げる。',
    tips: [
      '<ruby>筏<rt>いかだ</rt></ruby>には定員を超えない範囲で何人でも乗せることができます。',
      '対岸の登場人物を<ruby>筏<rt>いかだ</rt></ruby>に乗せる時は、下方向にスワイプします。上方向にスワイプすると<ruby>筏<rt>いかだ</rt></ruby>から降ります。',
    ],
  },
  category: 'unconditioned',
  level: 1,
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
    name: '戦士',
    appearance: {
      sprite: 'fighter1'
    },
    role: {
    }
  }, {
    id: 1,
    name: '盗賊',
    appearance: {
      sprite: 'thief1'
    },
    role: {
    }
  }, {
    id: 2,
    name: '魔法使い',
    appearance: {
      sprite: 'mage1'
    },
    role: {
    }
  }]
})
export default scene

import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 2,
  title: '三人旅',
  level: 1,
  category: 'unconditioned',
  rules: {
    conditions: [
      'すべての登場人物を対岸に渡す',
      '3回以内にクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。すべての登場人物が筏（いかだ）を漕（こ）げる。',
    tips: [
      '筏（いかだ）には定員を超えない範囲で何人でも乗せることができます。',
      '対岸の登場人物を筏（いかだ）に乗せる時は、下方向にスワイプします。上方向にスワイプすると筏（いかだ）から降ります。',
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
    name: '戦士',
    appearance: {
      sprite: 'fighter1'
    },
    role: {
      rower: true
    }
  }, {
    id: 1,
    name: '盗賊',
    appearance: {
      sprite: 'thief1'
    },
    role: {
      rower: true
    }
  }, {
    id: 2,
    name: '魔法使い',
    appearance: {
      sprite: 'mage1'
    },
    role: {
      rower: true
    }
  }]
})
export default scene

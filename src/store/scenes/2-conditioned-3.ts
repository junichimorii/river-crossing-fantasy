import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 13,
  title: '商人は荷物が多い（初級編）',
  level: 2,
  category: 'conditioned',
  rules: {
    conditions: [
      '重量制限に注意しながら、すべての登場人物を対岸に渡す',
      '5回以内にクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。すべての登場人物が筏（いかだ）を漕（こ）げる。',
    tips: [
      '重量制限に注意しながら川を渡るパズルです。',
    ],
  },
  passing: 5,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: {
      sprite: 'raft2'
    }
  }],
  casts: [{
    id: 0,
    name: '村人A',
    appearance: {
      sprite: 'villager1'
    },
    role: {
      weight: 1
    }
  }, {
    id: 1,
    name: '村人B',
    appearance: {
      sprite: 'villager2'
    },
    role: {
      weight: 1
    }
  }, {
    id: 2,
    name: '商人A',
    appearance: {
      sprite: 'merchant1',
    },
    role: {
      weight: 2,
    },
  }, {
    id: 3,
    name: '商人B',
    appearance: {
      sprite: 'merchant2',
    },
    role: {
      weight: 2,
    },
  }]
})
export default scene

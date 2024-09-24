import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 13,
  title: '商人は荷物が多い(2)',
  category: 6,
  order: 1,
  level: 2,
  rules: {
    conditions: [
      '重量制限に注意しながら、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。すべての登場人物が筏（いかだ）を漕（こ）げる。',
    tips: [
      '重量制限に注意しながら川を渡るパズルです。',
    ],
  },
  passing: 15,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: 'raft2'
  }],
  casts: [{
    id: 0,
    name: '村人A',
    appearance: 'villager1',
    role: {
      rower: true,
      weight: 1
    }
  }, {
    id: 1,
    name: '村人B',
    appearance: 'villager2',
    role: {
      rower: true,
      weight: 1
    }
  }, {
    id: 2,
    name: '村人C',
    appearance: 'villager3',
    role: {
      rower: true,
      weight: 1
    }
  }, {
    id: 3,
    name: '商人A',
    appearance: 'merchant1',
    role: {
      rower: true,
      weight: 2,
    },
  }, {
    id: 4,
    name: '商人B',
    appearance: 'merchant2',
    role: {
      rower: true,
      weight: 2,
    },
  }, {
    id: 5,
    name: '商人C',
    appearance: 'merchant3',
    role: {
      rower: true,
      weight: 2,
    },
  }]
})
export default scene

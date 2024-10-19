import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 13,
  title: 'ポーターは荷物が多い(2)',
  category: 8,
  order: 2,
  rules: {
    conditions: [
      '重量制限に注意しながら、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗り、重量制限2.0人分の筏（いかだ）が1艘（そう）。すべての登場人物が筏（いかだ）を漕（こ）げる。',
    tips: [
      '重量制限に注意しながら川を渡るパズルです。',
    ],
  },
  passing: 11,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: 'raft2'
  }],
  casts: [{
    id: 0,
    name: 'ポーターA',
    appearance: 'porter1',
    role: {
      rower: true,
      weight: 1.5
    },
  }, {
    id: 1,
    name: 'ポーターB',
    appearance: 'porter2',
    role: {
      rower: true,
      weight: 1.5
    },
  }, {
    id: 2,
    name: '村人A',
    appearance: 'villager1',
    role: {
      rower: true,
      weight: 1
    }
  }, {
    id: 3,
    name: '村人B',
    appearance: 'villager2',
    role: {
      rower: true,
      weight: 1
    }
  }, {
    id: 4,
    name: '村人C',
    appearance: 'villager3',
    role: {
      rower: true,
      weight: 1
    }
  }]
})
export default scene

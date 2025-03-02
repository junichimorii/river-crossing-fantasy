import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 14,
  title: '定期点検を忘れずに(2)',
  category: 15,
  order: 4,
  rules: {
    conditions: [
      '筏（いかだ）が故障しないよう修理しつつ、すべての登場人物を対岸に渡す',
    ],
    transportation: '筏（いかだ）を漕（こ）げるのは村人のみ。',
    tips: [
      '筏（いかだ）を修理しつつ川を渡るパズルです。ただし今回は、大工自身は筏（いかだ）を漕（こ）ぐことができません。',
    ],
  },
  passing: 9,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: 'raft2'
  }],
  crews: [{
    id: 0,
    name: '村人A',
    appearance: 'villager1',
    role: {
      rower: true,
    }
  }, {
    id: 1,
    name: '村人B',
    appearance: 'villager2',
    role: {
      rower: true,
    }
  }, {
    id: 2,
    name: '村人C',
    appearance: 'villager3',
    role: {
      rower: true,
    }
  }, {
    id: 3,
    name: '大工a',
    appearance: 'carpenter1',
    role: {
      rower: false,
      repairer: true
    }
  }, {
    id: 4,
    name: '大工b',
    appearance: 'carpenter2',
    role: {
      rower: false,
      repairer: true
    }
  }, {
    id: 5,
    name: '大工c',
    appearance: 'carpenter3',
    role: {
      rower: false,
      repairer: true
    }
  }]
})
export default scene

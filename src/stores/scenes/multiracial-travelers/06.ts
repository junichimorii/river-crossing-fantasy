import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 108,
  title: '道化師は自由を求める(2)',
  category: 15,
  order: 6,
  rules: {
    conditions: [
      '道化師たちが自由に行動できないよう気を遣いつつ、すべての登場人物を対岸に渡す',
    ],
    tips: [
      '**いずれかの場所に道化師しかいない**状況となった場合も、道化師たちは結託して逃走を企てます。',
    ],
  },
  passing: 9,
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
      rower: true
    }
  }, {
    id: 1,
    name: '村人B',
    appearance: 'villager2',
    role: {
      rower: true
    }
  }, {
    id: 2,
    name: '村人C',
    appearance: 'villager3',
    role: {
      rower: true
    }
  }, {
    id: 3,
    name: '道化師A',
    appearance: 'clown1',
    role: {
      rower: true,
      freespirited: true
    }
  }, {
    id: 4,
    name: '道化師B',
    appearance: 'clown2',
    role: {
      rower: true,
      freespirited: true
    }
  }, {
    id: 5,
    name: '道化師C',
    appearance: 'clown3',
    role: {
      rower: true,
      freespirited: true
    }
  }]
})
export default scene

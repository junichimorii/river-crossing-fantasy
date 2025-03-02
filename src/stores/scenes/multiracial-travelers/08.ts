import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 43,
  title: '村人とエルフと道化師(2)',
  category: 15,
  order: 8,
  rules: {
    conditions: [
      'エルフと道化師に気を遣いつつ、すべての登場人物を対岸に渡す',
    ],
    tips: [
      'エルフは、人間と一緒に筏（いかだ）に乗ることを嫌います。',
      '道化師は、自由に行動できる状態になると逃走を企てます。'
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
    name: 'エルフA',
    appearance: 'elf1',
    role: {
      rower: true,
      demihuman: true,
      misanthrope: true
    }
  }, {
    id: 3,
    name: 'エルフB',
    appearance: 'elf2',
    role: {
      rower: true,
      demihuman: true,
      misanthrope: true
    }
  }, {
    id: 4,
    name: '道化師A',
    appearance: 'clown1',
    role: {
      rower: true,
      freespirited: true
    }
  }, {
    id: 5,
    name: '道化師B',
    appearance: 'clown2',
    role: {
      rower: true,
      freespirited: true
    }
  }]
})
export default scene

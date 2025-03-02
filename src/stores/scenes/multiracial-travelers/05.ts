import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 12,
  title: 'エルフは人間がお嫌い(2)',
  category: 15,
  order: 5,
  rules: {
    conditions: [
      'エルフと人間が筏（いかだ）に同乗しないよう気を遣いつつ、すべての登場人物を対岸に渡す',
    ],
    tips: [
      'エルフと人間が筏（いかだ）に同乗しないよう気を遣いつつ川を渡るパズルです。',
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
    name: '村人C',
    appearance: 'villager3',
    role: {
      rower: true
    }
  }, {
    id: 3,
    name: 'エルフA',
    appearance: 'elf1',
    role: {
      rower: true,
      demihuman: true,
      misanthrope: true
    }
  }, {
    id: 4,
    name: 'エルフB',
    appearance: 'elf2',
    role: {
      rower: true,
      demihuman: true,
      misanthrope: true
    }
  }, {
    id: 5,
    name: 'エルフC',
    appearance: 'elf3',
    role: {
      rower: true,
      demihuman: true,
      misanthrope: true
    }
  }]
})
export default scene

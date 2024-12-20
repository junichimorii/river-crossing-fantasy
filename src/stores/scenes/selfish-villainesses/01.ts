import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 44,
  title: 'わがまま令嬢の旅(1)',
  category: 20,
  order: 1,
  rules: {
    conditions: [
      '令嬢同士が喧嘩（けんか）しないよう気を遣いつつ、すべての登場人物を対岸に渡す',
    ],
    tips: [
      '仲の悪い令嬢同士が喧嘩しないよう気を遣いながら川を渡るパズルです。',
      '令嬢は、**他家の令嬢と二人きり**になると喧嘩（けんか）を始めてしまいます。',
    ],
  },
  passing: 3,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: 'raft2'
  }],
  casts: [{
    id: 0,
    name: '青家令嬢',
    description: '他家の令嬢と二人きりになることを嫌う。',
    appearance: 'villainess11',
    role: {
      rower: true,
      discord: [ 1 ]
    }
  }, {
    id: 1,
    name: '赤家令嬢',
    description: '他家の令嬢と二人きりになることを嫌う。',
    appearance: 'villainess21',
    role: {
      rower: true,
      discord: [ 0 ]
    }
  }, {
    id: 2,
    name: '従者',
    appearance: 'maid51',
    role: {
      rower: true
    }
  }]
})
export default scene

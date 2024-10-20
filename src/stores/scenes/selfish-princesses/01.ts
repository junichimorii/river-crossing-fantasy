import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 44,
  title: 'わがまま王女の旅(1)',
  category: 6,
  order: 1,
  rules: {
    conditions: [
      '王女同士が喧嘩（けんか）しないよう気を遣いつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。すべての登場人物が筏（いかだ）を漕（こ）げる。',
    tips: [
      '王女同士が喧嘩しないよう気を遣いながら川を渡るパズルです。',
      '王女は、**他国の王女と二人きり**になると喧嘩（けんか）を始めてしまいます。',
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
    name: '青国王女',
    description: '他国の王女と二人きりになることを嫌う。',
    appearance: 'princess11',
    role: {
      rower: true,
      discord: [ 1 ]
    }
  }, {
    id: 1,
    name: '赤国王女',
    description: '他国の王女と二人きりになることを嫌う。',
    appearance: 'princess21',
    role: {
      rower: true,
      discord: [ 0 ]
    }
  }, {
    id: 2,
    name: '従者',
    appearance: 'maid1',
    role: {
      rower: true
    }
  }]
})
export default scene

import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 51,
  title: '身分違いの一行(2)',
  category: 20,
  order: 6,
  rules: {
    conditions: [
      '令嬢の機嫌（きげん）を損ねないよう気を遣いつつ、すべての登場人物を対岸に渡す',
    ],
    transportation: '筏（いかだ）を漕（こ）げるのは従者のみ。',
    tips: [
      '令嬢は、**村人と二人きり**になると機嫌（きげん）を損ねます。また令嬢と村人は筏（いかだ）を漕（こ）ぐことができません。',
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
    name: '従者',
    appearance: 'maid51',
    role: {
      rower: true
    }
  }, {
    id: 1,
    name: '令嬢A',
    description: '村人と二人きりになることを嫌う。',
    appearance: 'villainess11',
    role: {
      rower: false,
      discord: [ 5 ]
    }
  }, {
    id: 2,
    name: '令嬢B',
    description: '村人と二人きりになることを嫌う。',
    appearance: 'villainess21',
    role: {
      rower: false,
      discord: [ 5 ]
    }
  }, {
    id: 3,
    name: '令嬢C',
    description: '村人と二人きりになることを嫌う。',
    appearance: 'villainess31',
    role: {
      rower: false,
      discord: [ 5 ]
    }
  }, {
    id: 4,
    name: '令嬢D',
    description: '村人と二人きりになることを嫌う。',
    appearance: 'villainess41',
    role: {
      rower: false,
      discord: [ 5 ]
    }
  }, {
    id: 5,
    name: '村人',
    appearance: 'villager1',
    role: {
      rower: false
    }
  }]
})
export default scene

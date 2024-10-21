import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 51,
  title: '王女は道化師が苦手(2)',
  category: 20,
  order: 6,
  rules: {
    conditions: [
      '王女と道化師が二人きりにならないよう気を遣いつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。ただし筏（いかだ）を漕（こ）げるのは従者のみ。',
    tips: [
      '王女は、**道化師と二人きり**になるのが苦手です。また王女と道化師は筏（いかだ）を漕（こ）ぐことができません。',
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
    appearance: 'maid1',
    role: {
      rower: true
    }
  }, {
    id: 1,
    name: '王女A',
    description: '道化師と二人きりになるのが苦手。',
    appearance: 'princess11',
    role: {
      rower: false,
      discord: [ 5 ]
    }
  }, {
    id: 2,
    name: '王女B',
    description: '道化師と二人きりになるのが苦手。',
    appearance: 'princess21',
    role: {
      rower: false,
      discord: [ 5 ]
    }
  }, {
    id: 3,
    name: '王女C',
    description: '道化師と二人きりになるのが苦手。',
    appearance: 'princess31',
    role: {
      rower: false,
      discord: [ 5 ]
    }
  }, {
    id: 4,
    name: '王女D',
    description: '道化師と二人きりになるのが苦手。',
    appearance: 'princess41',
    role: {
      rower: false,
      discord: [ 5 ]
    }
  }, {
    id: 5,
    name: '道化師',
    appearance: 'clown1',
    role: {
      rower: false
    }
  }]
})
export default scene

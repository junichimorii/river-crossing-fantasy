import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 50,
  title: '王女は道化師が苦手(1)',
  category: 6,
  order: 5,
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
  passing: 3,
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
    name: '王女',
    description: '道化師と二人きりになるのが苦手。',
    appearance: 'princess11',
    role: {
      rower: false,
      discord: [ 2 ]
    }
  }, {
    id: 2,
    name: '道化師',
    appearance: 'clown1',
    role: {
      rower: false
    }
  }]
})
export default scene

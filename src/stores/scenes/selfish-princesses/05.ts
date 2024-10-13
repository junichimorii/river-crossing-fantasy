import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 50,
  title: '身分違いの一行(1)',
  category: 5,
  order: 5,
  rules: {
    conditions: [
      '王女の機嫌（きげん）を損ねないよう気を遣いつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。ただし筏（いかだ）を漕（こ）げるのは従者のみ。',
    tips: [
      '王女は、村人と二人きりになると**機嫌（きげん）を損ねます**。また王女と村人は筏（いかだ）を漕（こ）ぐことができません。',
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
    description: '村人と二人きりになることを嫌う。',
    appearance: 'princess11',
    role: {
      rower: false,
      discord: [ 2 ]
    }
  }, {
    id: 2,
    name: '村人',
    appearance: 'villager1',
    role: {
      rower: false
    }
  }]
})
export default scene

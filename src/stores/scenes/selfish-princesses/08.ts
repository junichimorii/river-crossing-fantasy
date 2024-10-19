import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 59,
  title: '王女から目を離さずに(2)',
  category: 6,
  order: 8,
  rules: {
    conditions: [
      '王女を他国の騎士と二人きりにしないよう気を遣いつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。ただし筏（いかだ）を漕（こ）げるのは騎士のみ。',
    tips: [
      '王女は、他国の騎士と二人きりになると**機嫌（きげん）を損ねます**。',
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
    name: '青国騎士',
    appearance: 'knight1',
    role: {
      rower: true
    }
  }, {
    id: 1,
    name: '青国王女a',
    description: '他国の騎士と二人きりになることを嫌う。',
    appearance: 'princess11',
    role: {
      rower: false,
      discord: [ 3, 5 ]
    }
  }, {
    id: 2,
    name: '青国王女b',
    description: '他国の騎士と二人きりになることを嫌う。',
    appearance: 'princess12',
    role: {
      rower: false,
      discord: [ 3, 5 ]
    }
  }, {
    id: 3,
    name: '赤国騎士',
    appearance: 'knight2',
    role: {
      rower: true
    }
  }, {
    id: 4,
    name: '赤国王女',
    description: '他国の騎士と二人きりになることを嫌う。',
    appearance: 'princess21',
    role: {
      rower: false,
      discord: [ 0, 5 ]
    }
  }, {
    id: 5,
    name: '緑国騎士',
    appearance: 'knight3',
    role: {
      rower: true
    }
  }]
})
export default scene

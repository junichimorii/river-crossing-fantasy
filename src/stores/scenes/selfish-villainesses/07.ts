import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 58,
  title: '令嬢から目を離さずに(1)',
  category: 20,
  order: 7,
  rules: {
    conditions: [
      '令嬢を他家の従者と二人きりにしないよう気を遣いつつ、すべての登場人物を対岸に渡す',
    ],
    transportation: '筏（いかだ）を漕（こ）げるのは従者のみ。',
    tips: [
      '令嬢は、**他家の従者と二人きり**になると機嫌（きげん）を損ねます。',
    ],
  },
  passing: 5,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: 'raft2'
  }],
  casts: [{
    id: 0,
    name: '青家従者',
    appearance: 'maid11',
    role: {
      rower: true
    }
  }, {
    id: 1,
    name: '青家令嬢',
    description: '他家の従者と二人きりになることを嫌う。',
    appearance: 'villainess11',
    role: {
      rower: false,
      discord: [ 2 ]
    }
  }, {
    id: 2,
    name: '赤家従者',
    appearance: 'maid21',
    role: {
      rower: true
    }
  }, {
    id: 3,
    name: '赤家令嬢',
    description: '他家の従者と二人きりになることを嫌う。',
    appearance: 'villainess21',
    role: {
      rower: false,
      discord: [ 0 ]
    }
  }]
})
export default scene

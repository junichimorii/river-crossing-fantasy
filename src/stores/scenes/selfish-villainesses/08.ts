import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 59,
  title: '令嬢から目を離さずに(2)',
  category: 20,
  order: 8,
  rules: {
    conditions: [
      '令嬢を他家の従者と二人きりにしないよう気を遣いつつ、すべての登場人物を対岸に渡す',
    ],
    transportation: '筏（いかだ）を漕（こ）げるのは従者のみ。',
    tips: [
      '令嬢は、**他家の従者と二人きり**になると機嫌（きげん）を損ねます。',
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
    name: '青家従者',
    appearance: 'maid11',
    role: {
      rower: true
    }
  }, {
    id: 1,
    name: '青家令嬢a',
    description: '他家の従者と二人きりになることを嫌う。',
    appearance: 'villainess11',
    role: {
      rower: false,
      discord: [ 3, 5 ]
    }
  }, {
    id: 2,
    name: '青家令嬢b',
    description: '他家の従者と二人きりになることを嫌う。',
    appearance: 'villainess12',
    role: {
      rower: false,
      discord: [ 3, 5 ]
    }
  }, {
    id: 3,
    name: '赤家従者',
    appearance: 'maid21',
    role: {
      rower: true
    }
  }, {
    id: 4,
    name: '赤家令嬢',
    description: '他家の従者と二人きりになることを嫌う。',
    appearance: 'villainess21',
    role: {
      rower: false,
      discord: [ 0, 5 ]
    }
  }, {
    id: 5,
    name: '緑家従者',
    appearance: 'maid31',
    role: {
      rower: true
    }
  }]
})
export default scene

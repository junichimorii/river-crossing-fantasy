import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 62,
  title: '令嬢から目を離さずに(3)',
  category: 20,
  order: 9,
  rules: {
    conditions: [
      '令嬢を他家の従者と二人きりにしないよう気を遣いつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。ただし筏（いかだ）を漕（こ）げるのは従者のみ。',
    tips: [
      '令嬢は、**他家の従者と二人きり**になると機嫌（きげん）を損ねます。',
    ],
  },
  passing: 13,
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
      discord: [ 2, 4, 6 ]
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
      discord: [ 0, 4, 6 ]
    }
  }, {
    id: 4,
    name: '緑家従者',
    appearance: 'maid31',
    role: {
      rower: true
    }
  }, {
    id: 5,
    name: '緑家令嬢',
    description: '他家の従者と二人きりになることを嫌う。',
    appearance: 'villainess31',
    role: {
      rower: false,
      discord: [ 0, 2, 6 ]
    }
  }, {
    id: 6,
    name: '紫家従者',
    appearance: 'maid41',
    role: {
      rower: true
    }
  }, {
    id: 7,
    name: '紫家令嬢',
    description: '他家の従者と二人きりになることを嫌う。',
    appearance: 'villainess41',
    role: {
      rower: false,
      discord: [ 0, 2, 4 ]
    }
  }]
})
export default scene

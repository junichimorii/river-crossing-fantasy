import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 45,
  title: 'わがまま令嬢の旅(2)',
  category: 20,
  order: 2,
  rules: {
    conditions: [
      '令嬢同士が喧嘩（けんか）しないよう気を遣いつつ、すべての登場人物を対岸に渡す',
    ],
    tips: [
      '令嬢たちは、**隣領の令嬢**と仲が良くありません。二人きりにならないよう気を付けましょう。',
      '隣領ではない令嬢とは二人きりになっても問題ありません。',
    ],
  },
  passing: 5,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: 'raft2'
  }],
  crews: [{
    id: 0,
    name: '青家令嬢',
    description: '赤家・紫家の令嬢と二人きりになることを嫌う。',
    appearance: 'villainess11',
    role: {
      rower: true,
      discord: [ 1, 3 ]
    }
  }, {
    id: 1,
    name: '赤家令嬢',
    description: '青家・緑家の令嬢と二人きりになることを嫌う。',
    appearance: 'villainess21',
    role: {
      rower: true,
      discord: [ 0, 2 ]
    }
  }, {
    id: 2,
    name: '緑家令嬢',
    description: '赤家・紫家の令嬢と二人きりになることを嫌う。',
    appearance: 'villainess31',
    role: {
      rower: true,
      discord: [ 1, 3 ]
    }
  }, {
    id: 3,
    name: '紫家令嬢',
    description: '青家・緑家の令嬢と二人きりになることを嫌う。',
    appearance: 'villainess41',
    role: {
      rower: true,
      discord: [ 0, 2 ]
    }
  }]
})
export default scene

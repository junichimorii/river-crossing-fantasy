import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 47,
  title: 'わがまま令嬢の旅(4)',
  category: 20,
  order: 4,
  rules: {
    conditions: [
      '令嬢同士が喧嘩（けんか）しないよう気を遣いつつ、すべての登場人物を対岸に渡す',
    ],
    tips: [
      '**隣領の令嬢と二人きり**にならないよう気を付けましょう。',
    ],
  },
  passing: 7,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: 'raft2'
  }],
  crews: [{
    id: 0,
    name: '青家令嬢',
    description: '赤家・黒家の令嬢と二人きりになることを嫌う。',
    appearance: 'villainess11',
    role: {
      rower: true,
      discord: [ 1, 4 ]
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
    description: '緑家・黒家の令嬢と二人きりになることを嫌う。',
    appearance: 'villainess41',
    role: {
      rower: true,
      discord: [ 2, 4 ]
    }
  }, {
    id: 4,
    name: '黒家令嬢',
    description: '青家・紫家の令嬢と二人きりになることを嫌う。',
    appearance: 'villainess51',
    role: {
      rower: true,
      discord: [ 0, 3 ]
    }
  }]
})
export default scene

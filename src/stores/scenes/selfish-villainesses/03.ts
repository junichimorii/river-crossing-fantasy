import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 46,
  title: 'わがまま令嬢の旅(3)',
  category: 20,
  order: 3,
  rules: {
    conditions: [
      '令嬢同士が喧嘩（けんか）しないよう気を遣いつつ、すべての登場人物を対岸に渡す',
    ],
    tips: [
      '**令嬢たちを二人きり**にしないよう気を付けましょう。。',
    ],
  },
  passing: 7,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: 'raft2'
  }],
  casts: [{
    id: 0,
    name: '青家令嬢',
    description: '他家の令嬢と二人きりになることを嫌う。',
    appearance: 'villainess11',
    role: {
      rower: true,
      discord: [ 1, 2 ]
    }
  }, {
    id: 1,
    name: '赤家令嬢',
    description: '他家の令嬢と二人きりになることを嫌う。',
    appearance: 'villainess21',
    role: {
      rower: true,
      discord: [ 0, 2 ]
    }
  }, {
    id: 2,
    name: '緑家令嬢',
    description: '他家の令嬢と二人きりになることを嫌う。',
    appearance: 'villainess31',
    role: {
      rower: true,
      discord: [ 0, 1 ]
    }
  }, {
    id: 3,
    name: '従者A',
    appearance: 'maid41',
    role: {
      rower: true
    }
  }, {
    id: 4,
    name: '従者B',
    appearance: 'maid51',
    role: {
      rower: true
    }
  }]
})
export default scene

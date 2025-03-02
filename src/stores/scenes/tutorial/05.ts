import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 101,
  title: '往還',
  category: 10,
  order: 5,
  rules: {
    conditions: [
      'すべての登場人物を初期位置の対岸に渡す',
      '2回以内にクリアする'
    ],
    tips: [
      '両岸に登場人物がいる状態でスタートします。それぞれの初期位置の対岸に渡ることが目的です。',
    ],
  },
  passing: 2,
  carriers: [{
    id: 0,
    capacity: 1,
    appearance: 'raft1'
  }],
  crews: [{
    id: 0,
    name: '青国騎士',
    appearance: 'knight1',
    role: {
      rower: true
    }
  }, {
    id: 1,
    name: '赤国騎士',
    appearance: 'knight2',
    coord: 1,
    role: {
      rower: true
    }
  }]
})
export default scene

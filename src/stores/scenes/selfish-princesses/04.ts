import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 47,
  title: 'わがまま王女の旅(4)',
  category: 6,
  order: 4,
  rules: {
    conditions: [
      '王女同士が喧嘩（けんか）しないよう気を遣いつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。すべての登場人物が筏（いかだ）を漕（こ）げる。',
    tips: [
      '**隣国の王女と二人きり**にならないよう気を付けましょう。',
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
    name: '青国王女',
    description: '赤国・黒国の王女と二人きりになることを嫌う。',
    appearance: 'princess11',
    role: {
      rower: true,
      discord: [ 1, 4 ]
    }
  }, {
    id: 1,
    name: '赤国王女',
    description: '青国・緑国の王女と二人きりになることを嫌う。',
    appearance: 'princess21',
    role: {
      rower: true,
      discord: [ 0, 2 ]
    }
  }, {
    id: 2,
    name: '緑国王女',
    description: '赤国・紫国の王女と二人きりになることを嫌う。',
    appearance: 'princess31',
    role: {
      rower: true,
      discord: [ 1, 3 ]
    }
  }, {
    id: 3,
    name: '紫国王女',
    description: '緑国・黒国の王女と二人きりになることを嫌う。',
    appearance: 'princess41',
    role: {
      rower: true,
      discord: [ 2, 4 ]
    }
  }, {
    id: 4,
    name: '黒国王女',
    description: '青国・紫国の王女と二人きりになることを嫌う。',
    appearance: 'princess51',
    role: {
      rower: true,
      discord: [ 0, 3 ]
    }
  }]
})
export default scene

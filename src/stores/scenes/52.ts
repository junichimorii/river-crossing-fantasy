import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 45,
  title: 'わがまま王女の旅(2)',
  category: 5,
  order: 2,
  level: 2,
  rules: {
    conditions: [
      '王女同士が喧嘩（けんか）しないよう気を遣いつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。すべての登場人物が筏（いかだ）を漕（こ）げる。',
    tips: [
      '王女たちは、<b>隣国の王女</b>と仲が良くありません。二人きりにならないよう気を付けましょう。',
      '隣国ではない王女とは二人きりになっても問題ありません。',
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
    name: '青国王女',
    description: '赤国・紫国の王女と二人きりになることを嫌う。',
    appearance: 'princess11',
    role: {
      rower: true,
      discord: [ 1, 3 ]
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
    description: '青国・緑国の王女と二人きりになることを嫌う。',
    appearance: 'princess41',
    role: {
      rower: true,
      discord: [ 0, 2 ]
    }
  }]
})
export default scene

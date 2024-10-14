import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 68,
  title: '中州へ',
  category: 0,
  order: 5,
  rules: {
    conditions: [
      'すべての登場人物を対岸に渡す',
      '2回以内にクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。すべての登場人物が筏（いかだ）を漕（こ）げる。川の中の島に降りることもできる。',
    tips: [
      '川の中間にある中州に降りることができます。',
      '中州にいる登場人物を右方向にスワイプすると筏（いかだ）に乗り、左方向にスワイプすると筏（いかだ）から降ります。',
      '筏（いかだ）を移動させるボタンが2つ表示されている時は、進行方向を選ぶことができます。',
    ],
  },
  landscape: {
    island: true
  },
  passing: 2,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: 'raft2'
  }],
  casts: [{
    id: 0,
    name: '従者',
    appearance: 'maid1',
    role: {
      rower: true
    }
  }, {
    id: 1,
    name: '王女',
    appearance: 'princess11',
    role: {
      rower: true
    }
  }]
})
export default scene

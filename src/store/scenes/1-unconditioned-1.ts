import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 1,
  title: '一人旅',
  level: 1,
  category: 'unconditioned',
  rules: {
    conditions: [
      '登場人物を対岸に渡す',
      '1回以内にクリアする'
    ],
    transportation: '1人乗りの筏（いかだ）が1艘（そう）。すべての登場人物が筏（いかだ）を漕（こ）げる。',
    tips: [
      '登場人物を上方向にスワイプすると、筏（いかだ）の上にセットされます。',
      '筏（いかだ）を漕（こ）げる登場人物が乗ると、ボタンが表示されます。ボタンをタップすると対岸へ移動します。',
      '筏（いかだ）の上の登場人物を下方向にスワイプすると筏（いかだ）から降ります。',
    ],
  },
  passing: 1,
  carriers: [{
    id: 0,
    capacity: 1,
    appearance: {
      sprite: 'raft1'
    }
  }],
  casts: [{
    id: 0,
    name: '村人',
    appearance: {
      sprite: 'villager1'
    },
    role: {
      rower: true
    }
  }]
})
export default scene

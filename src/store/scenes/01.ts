import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 1,
  title: '一人旅',
  description: {
    conditions: '登場人物を対岸に渡す',
    transportation: '1人乗りの舟が1艘。すべての登場人物が舟を漕げる。',
    tips: [
      '登場人物を上方向にスワイプすると、舟の上にセットされます。',
      '舟を漕げる登場人物が乗ると、ボタンが表示されます。ボタンをタップすると対岸へ移動します。',
      '舟の上の登場人物を下方向にスワイプすると舟から降ります。',
    ],
  },
  category: 'unconditioned',
  level: 1,
  passing: 1,
  carriers: [{
    id: 0,
    capacity: 1,
    appearance: {
      sprite: '/images/carriers/boat1.png'
    }
  }],
  casts: [{
    id: 0,
    name: '村人',
    appearance: {
      sprite: '/images/casts/villager1.png'
    },
    role: {
    }
  }]
})
export default scene

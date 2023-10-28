import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 1,
  title: '一人旅',
  description: {
    conditions: 'キャラクターを対岸に渡す',
    transportation: '1人乗りの舟が1艘。すべてのキャラクターが舟を漕げる。',
  },
  tips: [
    'キャラクターを上方向にスワイプすると、舟の上にセットされます。',
    '舟を漕げるキャラクターが乗ると、ボタンが表示されます。ボタンをタップすると対岸へ移動します。',
    '舟の上のキャラクターを下方向にスワイプすると舟から降ります。',
  ],
  category: 'unconditioned',
  landscape: '/images/landscapes/daytime-river.png',
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
}) as Scene
export default scene

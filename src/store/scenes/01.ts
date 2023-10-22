import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 1,
  title: '一人旅',
  description: {
    conditions: 'すべてのキャラクターが対岸に渡る',
    transportation: '1人乗りの舟が1艘。すべてのキャラクターが舟を漕げる。',
  },
  tips: [
    'キャラクターを上方向にスワイプすると、舟の上にセットされます。',
    '舟を漕げるキャラクターが乗ると、ボタンが表示されます。ボタンをタップすると対岸へ移動します。',
    '舟の上のキャラクターを下方向にスワイプすると舟から降ります。',
  ],
  category: 'unconditioned',
  passing: 1,
  landscape: '/images/landscapes/daytime-river.png',
  carriers: [{
    id: 0,
    appearance: '/images/carriers/boat1.png',
    capacity: 1,
  }],
  casts: [{
    id: 0,
    avatar: '/images/casts/villager1.png',
    name: '村人',
    role: {
    },
  }],
}) as Scene
export default scene

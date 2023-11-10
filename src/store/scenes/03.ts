import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 3,
  title: '逃避行(1)',
  description: {
    conditions: 'すべてのキャラクターを最小回数で対岸に渡す',
    transportation: '2人乗りの舟が1艘。ただし舟を漕げるのは騎士のみ。',
    tips: [
      '舟を漕げるキャラクターと漕げないキャラクターがいます。',
      '舟を移動させるボタンは、舟を漕げるキャラクターが乗っている時のみ表示されます。',
    ],
  },
  category: 'qualified',
  landscape: '/images/landscapes/daytime-river.png',
  passing: 3,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: {
      sprite: '/images/carriers/boat2.png'
    }
  }],
  casts: [{
    id: 0,
    name: '騎士',
    appearance: {
      sprite: '/images/casts/knight-a1.png',
    },
    role: {
      rower: true,
    }
  }, {
    id: 1,
    name: '王女A',
    appearance: {
      sprite: '/images/casts/princess-a1.png',
      ratio: 0.85
    },
    role: {
      rower: false,
    }
  }, {
    id: 2,
    name: '王女B',
    appearance: {
      sprite: '/images/casts/princess-a2.png',
      ratio: 0.85
    },
    role: {
      rower: false,
    }
  }]
})
export default scene

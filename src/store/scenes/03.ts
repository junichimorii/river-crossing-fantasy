import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 3,
  title: '逃避行（入門編）',
  description: {
    conditions: 'すべての登場人物を最小回数で対岸に渡す',
    transportation: '2人乗りの舟が1<ruby>艘<rt>そう</rt></ruby>。ただし舟を<ruby>漕<rt>こ</rt></ruby>げるのは騎士のみ。',
    tips: [
      '舟を<ruby>漕<rt>こ</rt></ruby>げる登場人物と<ruby>漕<rt>こ</rt></ruby>げない登場人物がいます。',
      '舟を移動させるボタンは、舟を<ruby>漕<rt>こ</rt></ruby>げる登場人物が乗っている時のみ表示されます。',
    ],
  },
  category: 'qualified',
  level: 1,
  passing: 3,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: {
      sprite: 'boat2'
    }
  }],
  casts: [{
    id: 0,
    name: '騎士',
    appearance: {
      sprite: 'knight11',
    },
    role: {
      rower: true,
    }
  }, {
    id: 1,
    name: '王女a',
    appearance: {
      sprite: 'princess11',
      ratio: 0.85
    },
    role: {
      rower: false,
    }
  }, {
    id: 2,
    name: '王女b',
    appearance: {
      sprite: 'princess12',
      ratio: 0.85
    },
    role: {
      rower: false,
    }
  }]
})
export default scene

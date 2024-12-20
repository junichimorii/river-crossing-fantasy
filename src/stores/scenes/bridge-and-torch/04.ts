import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 30,
  title: '闇夜の旅路(4)',
  category: 75,
  order: 4,
  rules: {
    conditions: [
      'すべての登場人物を対岸に渡す',
    ],
    tips: [
      '5人で橋を渡ります。最も遅い王女は、橋を渡るのに12分かかります。',
    ],
  },
  landscape: {
    night: true
  },
  passing: 30,
  level: 4,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: 'touch'
  }],
  casts: [{
    id: 0,
    name: '盗賊',
    appearance: 'thief1',
    role: {
      duration: 1
    }
  }, {
    id: 1,
    name: '戦士',
    appearance: 'fighter1',
    role: {
      duration: 3
    }
  }, {
    id: 2,
    name: '司祭',
    appearance: 'priest1',
    role: {
      duration: 7
    }
  }, {
    id: 3,
    name: '魔法使い',
    appearance: 'wizard1',
    role: {
      duration: 9
    }
  }, {
    id: 4,
    name: '王女',
    appearance: 'princess11',
    role: {
      duration: 12
    }
  }]
})
export default scene

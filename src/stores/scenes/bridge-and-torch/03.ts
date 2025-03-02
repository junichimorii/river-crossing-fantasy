import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 24,
  title: '闇夜の旅路(3)',
  category: 75,
  order: 3,
  rules: {
    conditions: [
      'すべての登場人物を対岸に渡す',
    ],
    tips: [
      '古くから「bridge and torch problem」（橋とたいまつの問題）等の名で知られる川渡りパズルを改変したものです。',
      '4人で橋を渡ります。最も遅い魔法使いは、橋を渡るのに8分かかります。',
    ],
  },
  landscape: {
    night: true
  },
  passing: 15,
  level: 4,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: 'touch'
  }],
  crews: [{
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
      duration: 2
    }
  }, {
    id: 2,
    name: '司祭',
    appearance: 'priest1',
    role: {
      duration: 5
    }
  }, {
    id: 3,
    name: '魔法使い',
    appearance: 'wizard1',
    role: {
      duration: 8
    }
  }]
})
export default scene

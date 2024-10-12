import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 48,
  title: '闇夜の旅路(5)',
  category: 7,
  order: 5,
  rules: {
    conditions: [
      'すべての登場人物を対岸に渡す',
      '最短時間でクリアする'
    ],
    transportation: '吊り橋の人数制限は2人まで。移動時はたいまつが必要。',
    tips: [
      '6人で橋を渡ります。最も遅い王女は、橋を渡るのに12分かかります。',
    ],
  },
  landscape: {
    night: true
  },
  passing: 32,
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
    appearance: 'mage1',
    role: {
      duration: 8
    }
  }, {
    id: 4,
    name: '村人',
    appearance: 'villager1',
    role: {
      duration: 10
    }
  }, {
    id: 5,
    name: '王女',
    appearance: 'princess11',
    role: {
      duration: 12
    }
  }]
})
export default scene

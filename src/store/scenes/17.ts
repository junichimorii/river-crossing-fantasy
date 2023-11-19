import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 17,
  title: '闇夜の旅路（中級編）',
  description: {
    conditions: 'すべての登場人物を15分以内に対岸に渡す',
    transportation: '吊り橋の人数制限は2人まで。移動時はたいまつが必要。',
    tips: [
      '古くから「bridge and torch problem」（橋とたいまつの問題）等の名で知られる川渡りパズルを改変したもの。',
    ],
  },
  category: 'time-limited',
  landscape: {
    night: true
  },
  level: 3,
  passing: 15,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: {
      sprite: 'touch'
    }
  }],
  casts: [{
    id: 0,
    name: '盗賊',
    appearance: {
      sprite: 'thief1'
    },
    role: {
      duration: 1
    }
  }, {
    id: 1,
    name: '戦士',
    appearance: {
      sprite: 'fighter1'
    },
    role: {
      duration: 2
    }
  }, {
    id: 2,
    name: '司祭',
    appearance: {
      sprite: 'priest1'
    },
    role: {
      duration: 5
    }
  }, {
    id: 3,
    name: '魔法使い',
    appearance: {
      sprite: 'mage1'
    },
    role: {
      duration: 8
    }
  }]
})
export default scene

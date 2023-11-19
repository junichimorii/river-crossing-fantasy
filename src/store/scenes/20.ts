import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 20,
  title: '闇夜の旅路（上級編）',
  description: {
    conditions: 'すべての登場人物を30分以内に対岸に渡す',
    transportation: '吊り橋の人数制限は2人まで。移動時はたいまつが必要。',
  },
  category: 'time-limited',
  landscape: {
    night: true
  },
  level: 4,
  passing: 30,
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
      duration: 3
    }
  }, {
    id: 2,
    name: '司祭',
    appearance: {
      sprite: 'priest1'
    },
    role: {
      duration: 7
    }
  }, {
    id: 3,
    name: '魔法使い',
    appearance: {
      sprite: 'mage1'
    },
    role: {
      duration: 9
    }
  }, {
    id: 4,
    name: '王女',
    appearance: {
      sprite: 'princess11'
    },
    role: {
      duration: 12
    }
  }]
})
export default scene

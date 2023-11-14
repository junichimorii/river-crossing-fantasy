import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 20,
  title: '闇夜の旅（上級編）',
  description: {
    conditions: 'すべてのキャラクターを30分以内に対岸に渡す',
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
      sprite: '/images/carriers/touch.png'
    }
  }],
  casts: [{
    id: 0,
    name: '盗賊',
    appearance: {
      sprite: '/images/casts/thief1.png'
    },
    role: {
      duration: 1
    }
  }, {
    id: 1,
    name: '戦士',
    appearance: {
      sprite: '/images/casts/fighter1.png'
    },
    role: {
      duration: 3
    }
  }, {
    id: 2,
    name: '司祭',
    appearance: {
      sprite: '/images/casts/priest1.png'
    },
    role: {
      duration: 6
    }
  }, {
    id: 3,
    name: '魔法使い',
    appearance: {
      sprite: '/images/casts/mage1.png'
    },
    role: {
      duration: 8
    }
  }, {
    id: 4,
    name: '王女',
    appearance: {
      sprite: '/images/casts/princess-a1.png'
    },
    role: {
      duration: 12
    }
  }]
})
export default scene

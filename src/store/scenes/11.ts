import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 11,
  title: '闇夜の旅（初級編2）',
  description: {
    conditions: 'すべてのキャラクターを7分以内に対岸に渡す',
    transportation: '吊り橋の人数制限は2人まで。移動時はたいまつが必要。',
  },
  category: 'time-limited',
  landscape: '/images/landscapes/night-bridge.png',
  passing: 7,
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
      duration: 2
    }
  }, {
    id: 2,
    name: '司祭',
    appearance: {
      sprite: '/images/casts/priest1.png'
    },
    role: {
      duration: 4
    }
  }]
}) as Scene
export default scene

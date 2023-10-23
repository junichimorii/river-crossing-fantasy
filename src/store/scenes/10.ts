import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 10,
  title: '闇夜の旅（初級編2）',
  description: {
    conditions: 'すべてのキャラクターを7分以内に対岸に渡す',
    transportation: '吊り橋の人数制限は2人まで。移動時はたいまつが必要。',
  },
  category: 'time-limited',
  passing: 7,
  landscape: '/images/landscapes/night-bridge.png',
  carriers: [{
    id: 0,
    appearance: '/images/carriers/touch.png',
    capacity: 2,
  }],
  casts: [{
    id: 0,
    avatar: '/images/casts/thief1.png',
    name: '盗賊',
    role: {
      duration: 1, 
    },
  }, {
    id: 1,
    avatar: '/images/casts/fighter1.png',
    name: '戦士',
    role: {
      duration: 2, 
    },
  }, {
    id: 2,
    avatar: '/images/casts/black-mage1.png',
    name: '魔法使い',
    role: {
      duration: 4, 
    },
  }],
}) as Scene
export default scene

import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 20,
  title: '闇夜の旅（上級編）',
  description: {
    conditions: 'すべてのキャラクターを30分以内に対岸に渡す',
    transportation: '吊り橋の人数制限は2人まで。移動時はたいまつが必要。',
  },
  category: 'time-limited',
  landscape: '/images/landscapes/night-bridge.png',
  passing: 30,
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
      duration: 3, 
    },
  }, {
    id: 2,
    avatar: '/images/casts/priest1.png',
    name: '司祭',
    role: {
      duration: 6, 
    },
  }, {
    id: 3,
    avatar: '/images/casts/mage1.png',
    name: '魔法使い',
    role: {
      duration: 8, 
    },
  }, {
    id: 4,
    avatar: '/images/casts/princess-a1.png',
    name: '王女',
    role: {
      duration: 12, 
    },
  }],
}) as Scene
export default scene

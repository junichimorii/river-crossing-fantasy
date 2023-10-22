import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 10,
  title: '闇夜の冒険(2)',
  description: {
    conditions: 'すべてのキャラクターが15分以内に対岸に渡る',
    transportation: '吊り橋の人数制限は2人まで。移動時はたいまつが必要。',
  },
  tips: [
    '古くから「bridge and torch problem」（橋とたいまつの問題）等の名で知られる川渡りパズル。',
  ],
  category: 'time-limited',
  passing: 15,
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
      duration: 5, 
    },
  }, {
    id: 3,
    avatar: '/images/casts/knight1.png',
    name: '騎士',
    role: {
      duration: 8, 
    },
  }],
}) as Scene
export default scene

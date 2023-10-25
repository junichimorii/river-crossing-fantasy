import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 15,
  title: '闇夜の旅（中級編）',
  description: {
    conditions: 'すべてのキャラクターを15分以内に対岸に渡す',
    transportation: '吊り橋の人数制限は2人まで。移動時はたいまつが必要。',
  },
  tips: [
    '古くから「bridge and torch problem」（橋とたいまつの問題）等の名で知られる川渡りパズルを改変したもの。',
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
    avatar: '/images/casts/priest1.png',
    name: '司祭',
    role: {
      duration: 5, 
    },
  }, {
    id: 3,
    avatar: '/images/casts/mage1.png',
    name: '魔法使い',
    role: {
      duration: 8, 
    },
  }],
}) as Scene
export default scene

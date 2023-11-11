import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 11,
  title: '危険なパーティ（初級編2）',
  description: {
    conditions: 'キャラクターを敵から保護しつつ、すべてのキャラクターを最小回数で対岸に渡す',
    transportation: '2人乗りの舟が1艘。ただし舟を漕げるのは魔獣使いのみ。',
    tips: [
      '古くから「wolf, goat and cabbage problem」（オオカミとヤギとキャベツ）の名で知られる川渡りパズルを改変したもの。',
    ],
  },
  category: 'predators-and-guardians',
  level: 2,
  passing: 7,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: {
      sprite: '/images/carriers/boat2.png'
    }
  }],
  casts: [{
    id: 0,
    name: '魔獣使い',
    appearance: {
      sprite: '/images/casts/beast-tamer1.png'
    },
    role: {
      rower: true
    },
  }, {
    id: 1,
    name: '騎士',
    description: '魔獣使いが目を離すと魔獣を討伐しようとする。',
    appearance: {
      sprite: '/images/casts/knight-a1.png',
      ratio: 0.85
    },
    role: {
      rower: false
    },
  }, {
    id: 2,
    name: '魔獣',
    description: '魔獣使いが目を離すと村人を襲う。',
    appearance: {
      sprite: '/images/casts/therianthropy1.png',
      ratio: 0.85
    },
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0
      }]
    }
  }, {
    id: 3,
    name: '村人',
    appearance: {
      sprite: '/images/casts/villager1.png',
      ratio: 0.85
    },
    role: {
      rower: false,
      predators: [{
        predator: 2,
        guardian: 0
      }]
    }
  }]
})
export default scene

import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 10,
  title: '危険なパーティ（初級編2）',
  description: {
    conditions: '村人を魔獣から保護しつつ、すべてのキャラクターを最小回数で対岸に渡す',
    transportation: '2人乗りの舟が1艘。ただし舟を漕げるのは魔獣使いのみ。',
  },
  tips: [
    '古くから「虎の子渡し」の名で知られる川渡りパズルを改変したもの。',
  ],
  category: 'predators-and-guardians',
  landscape: '/images/landscapes/daytime-river.png',
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
      canRow: true,
    }
  }, {
    id: 1,
    name: '村人A',
    appearance: {
      sprite: '/images/casts/villager1.png',
      ratio: 0.85
    },
    role: {
      canRow: false,
      predators: [{
        predator: 3,
        guardian: 0,
      }]
    }
  }, {
    id: 2,
    name: '村人B',
    appearance: {
      sprite: '/images/casts/villager2.png',
      ratio: 0.85
    },
    role: {
      canRow: false,
      predators: [{
        predator: 3,
        guardian: 0,
      }]
    }
  }, {
    id: 3,
    name: '魔獣',
    description: '魔獣使いが目を離すと村人を襲う。',
    appearance: {
      sprite: '/images/casts/therianthropy1.png',
      ratio: 0.85
    },
    role: {
      canRow: false
    }
  }]
}) as Scene
export default scene

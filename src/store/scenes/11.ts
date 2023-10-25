import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 11,
  title: '危険なパーティ（初級編3）',
  description: {
    conditions: 'キャラクターを敵から保護しつつ、すべてのキャラクターを最小回数で対岸に渡す',
    transportation: '2人乗りの舟が1艘。ただし舟を漕げるのは魔獣使いのみ。',
  },
  tips: [
    '古くから「wolf, goat and cabbage problem」（オオカミとヤギとキャベツ）の名で知られる川渡りパズルを改変したもの。',
  ],
  category: 'predators-and-guardians',
  passing: 7,
  landscape: '/images/landscapes/daytime-river.png',
  carriers: [{
    id: 0,
    appearance: '/images/carriers/boat2.png',
    capacity: 2,
  }],
  casts: [{
    id: 0,
    avatar: '/images/casts/beast-tamer1.png',
    name: '魔獣使い',
    role: {
      canRow: true,
    },
  }, {
    id: 1,
    avatar: '/images/casts/knight-a1.png',
    name: '騎士',
    description: '魔獣使いが目を離すと魔獣を討伐しようとする。',
    ratio: 0.85,
    role: {
      canRow: false,
    },
  }, {
    id: 2,
    avatar: '/images/casts/therianthropy1.png',
    name: '魔獣',
    description: '魔獣使いが目を離すと村人を襲う。',
    ratio: 0.85,
    role: {
      canRow: false,
      predators: [{
        predator: 1,
        guardian: 0,
      }],
    },
  }, {
    id: 3,
    avatar: '/images/casts/villager1.png',
    name: '村人',
    ratio: 0.85,
    role: {
      canRow: false,
      predators: [{
        predator: 2,
        guardian: 0,
      }],
    },
  }],
}) as Scene
export default scene

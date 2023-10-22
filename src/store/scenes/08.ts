import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 8,
  title: '危険な冒険者たち(2)',
  description: {
    conditions: 'すべてのキャラクターが危機に瀕することなく最小回数で対岸に渡る',
    transportation: '2人乗りの舟が1艘。ただし舟を漕げるのは魔獣使いのみ。',
  },
  tips: [
    '古くから「虎の子渡し」の名で知られる川渡りパズル。',
  ],
  category: 'enemies-and-guardians',
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
    avatar: '/images/casts/villager1.png',
    name: '村人A',
    ratio: 0.85,
    role: {
      canRow: false,
      enemies: [3],
      guardian: 0,
    },
  }, {
    id: 2,
    avatar: '/images/casts/villager2.png',
    name: '村人B',
    ratio: 0.85,
    role: {
      canRow: false,
      enemies: [3],
      guardian: 0,
    },
  }, {
    id: 3,
    avatar: '/images/casts/therianthropy1.png',
    name: '魔獣',
    description: '魔獣使いが目を離すと村人を襲う。',
    ratio: 0.85,
    role: {
      canRow: false,
    },
  }],
}) as Scene
export default scene

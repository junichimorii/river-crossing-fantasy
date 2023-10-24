import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 19,
  title: '危険なパーティ（上級編）',
  description: {
    conditions: 'キャラクターを敵から保護しつつ、すべてのキャラクターを最小回数で対岸に渡す',
    transportation: '2人乗りの舟が1艘。ただし舟を漕げるのは魔獣使いのみ。',
  },
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
    avatar: '/images/casts/therianthropy1.png',
    name: '魔獣',
    description: '魔獣使いが目を離すと魔獣使い以外の全員を襲う。',
    ratio: 0.85,
    role: {
      canRow: false,
    },
  }, {
    id: 2,
    avatar: '/images/casts/knight-indigo1.png',
    name: 'A国騎士',
    description: 'B国騎士が目を離すとB国王女を襲う。',
    role: {
      canRow: false,
      predators: [{
        predator: 1,
        guardian: 0,
      }],
    },
  }, {
    id: 3,
    avatar: '/images/casts/princess-indigo1.png',
    name: 'A国王女1',
    ratio: 0.85,
    role: {
      canRow: false,
      predators: [{
        predator: 1,
        guardian: 0,
      }, {
        predator: 5,
        guardian: 2,
      }],
    },
  }, {
    id: 4,
    avatar: '/images/casts/princess-indigo2.png',
    name: 'A国王女2',
    ratio: 0.85,
    role: {
      canRow: false,
      predators: [{
        predator: 1,
        guardian: 0,
      }, {
        predator: 5,
        guardian: 2,
      }],
    },
  }, {
    id: 5,
    avatar: '/images/casts/knight-pink1.png',
    name: 'B国騎士',
    description: 'A国騎士が目を離すとA国王女を襲う。',
    role: {
      canRow: false,
      predators: [{
        predator: 1,
        guardian: 0,
      }],
    },
  }, {
    id: 6,
    avatar: '/images/casts/princess-pink1.png',
    name: 'B国王女1',
    ratio: 0.85,
    role: {
      canRow: false,
      predators: [{
        predator: 1,
        guardian: 0,
      }, {
        predator: 2,
        guardian: 5,
      }],
    },
  }, {
    id: 7,
    avatar: '/images/casts/princess-pink2.png',
    name: 'B国王女2',
    ratio: 0.85,
    role: {
      canRow: false,
      predators: [{
        predator: 1,
        guardian: 0,
      }, {
        predator: 2,
        guardian: 5,
      }],
    },
  }],
}) as Scene
export default scene

import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 14,
  title: '危険なパーティ（中級編）',
  description: {
    conditions: 'キャラクターを敵から保護しつつ、すべてのキャラクターを最小回数で対岸に渡す',
    transportation: '2人乗りの舟が1艘。ただし舟を漕げるのは魔獣使いのみ。',
  },
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
    name: '魔獣',
    description: '魔獣使いが目を離すと魔獣使い以外の全員を襲う。',
    appearance: {
      sprite: '/images/casts/therianthropy1.png',
      ratio: 0.85
    },
    role: {
      canRow: false
    }
  }, {
    id: 2,
    name: 'A国騎士',
    description: 'B国騎士が目を離すとB国王女を襲う。',
    appearance: {
      sprite: '/images/casts/knight-a1.png'
    },
    role: {
      canRow: false,
      predators: [{
        predator: 1,
        guardian: 0,
      }]
    }
  }, {
    id: 3,
    name: 'A国王女',
    appearance: {
      sprite: '/images/casts/princess-a1.png',
      ratio: 0.85
    },
    role: {
      canRow: false,
      predators: [{
        predator: 1,
        guardian: 0
      }, {
        predator: 4,
        guardian: 2
      }]
    }
  }, {
    id: 4,
    name: 'B国騎士',
    description: 'A国騎士が目を離すとA国王女を襲う。',
    appearance: {
      sprite: '/images/casts/knight-b1.png'
    },
    role: {
      canRow: false,
      predators: [{
        predator: 1,
        guardian: 0,
      }]
    }
  }, {
    id: 5,
    name: 'B国王女',
    appearance: {
      sprite: '/images/casts/princess-b1.png',
      ratio: 0.85
    },
    role: {
      canRow: false,
      predators: [{
        predator: 1,
        guardian: 0
      }, {
        predator: 2,
        guardian: 4
      }]
    }
  }]
}) as Scene
export default scene

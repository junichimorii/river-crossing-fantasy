import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 24,
  title: '危険なパーティ（上級編3）',
  description: {
    conditions: '登場人物を敵から保護しつつ、すべての登場人物を最小回数で対岸に渡す',
    transportation: '2人乗りの舟が1艘。ただし舟を漕げるのは魔獣使いと騎士のみ。川の中の島に降りることもできる。',
  },
  category: 'predators-and-guardians',
  landscape: {
    island: true
  },
  level: 4,
  passing: 34,
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
    name: '魔獣',
    description: '魔獣使いが目を離すと魔獣使い以外の全員を襲う。',
    appearance: {
      sprite: '/images/casts/therianthropy1.png',
      ratio: 0.85
    },
    role: {
      rower: false
    }
  }, {
    id: 2,
    name: 'A国騎士',
    description: 'B国騎士が目を離すとB国王女を襲う。',
    appearance: {
      sprite: '/images/casts/knight-a1.png'
    },
    role: {
      rower: true,
      predators: [{
        predator: 1,
        guardian: 0
      }]
    }
  }, {
    id: 3,
    name: 'A国王女1',
    appearance: {
      sprite: '/images/casts/princess-a1.png',
      ratio: 0.85
    },
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0
      }, {
        predator: 6,
        guardian: 2
      }]
    }
  }, {
    id: 4,
    name: 'A国王女2',
    appearance: {
      sprite: '/images/casts/princess-a2.png',
      ratio: 0.85
    },
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0
      }, {
        predator: 6,
        guardian: 2
      }]
    }
  }, {
    id: 5,
    name: 'A国王女3',
    appearance: {
      sprite: '/images/casts/princess-a3.png',
      ratio: 0.85
    },
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0
      }, {
        predator: 6,
        guardian: 2
      }]
    }
  }, {
    id: 6,
    name: 'B国騎士',
    description: 'A国騎士が目を離すとA国王女を襲う。',
    appearance: {
      sprite: '/images/casts/knight-b1.png'
    },
    role: {
      rower: true,
      predators: [{
        predator: 1,
        guardian: 0
      }]
    }
  }, {
    id: 7,
    name: 'B国王女1',
    appearance: {
      sprite: '/images/casts/princess-b1.png',
      ratio: 0.85
    },
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0
      }, {
        predator: 2,
        guardian: 6
      }]
    }
  }, {
    id: 8,
    name: 'B国王女2',
    appearance: {
      sprite: '/images/casts/princess-b2.png',
      ratio: 0.85
    },
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0
      }, {
        predator: 2,
        guardian: 6
      }]
    }
  }, {
    id: 9,
    name: 'B国王女3',
    appearance: {
      sprite: '/images/casts/princess-b3.png',
      ratio: 0.85
    },
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0
      }, {
        predator: 2,
        guardian: 6
      }]
    }
  }]
})
export default scene

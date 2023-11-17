import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 23,
  title: '危険なパーティ（上級編2）',
  description: {
    conditions: '登場人物を敵から保護しつつ、すべての登場人物を最小回数で対岸に渡す',
    transportation: '3人乗りの舟が1<ruby>艘<rt>そう</rt></ruby>。ただし舟を<ruby>漕<rt>こ</rt></ruby>げるのは魔獣使いと騎士のみ。',
  },
  category: 'predators-and-guardians',
  level: 4,
  passing: 9,
  carriers: [{
    id: 0,
    capacity: 3,
    appearance: {
      sprite: '/images/carriers/boat3.png'
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
    name: '魔獣A',
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
    name: '魔獣B',
    description: '魔獣使いが目を離すと魔獣使い以外の全員を襲う。',
    appearance: {
      sprite: '/images/casts/therianthropy1.png',
      ratio: 0.85
    },
    role: {
      rower: false
    }
  }, {
    id: 3,
    name: 'A国騎士',
    description: '他国の騎士が目を離すとその国の王女を襲う。',
    appearance: {
      sprite: '/images/casts/knight-a1.png'
    },
    role: {
      rower: true,
      predators: [{
        predator: 1,
        guardian: 0
      }, {
        predator: 2,
        guardian: 0
      }]
    }
  }, {
    id: 4,
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
        predator: 2,
        guardian: 0
      }, {
        predator: 5,
        guardian: 3
      }, {
        predator: 7,
        guardian: 3
      }]
    }
  }, {
    id: 5,
    name: 'B国騎士',
    description: '他国の騎士が目を離すとその国の王女を襲う。',
    appearance: {
      sprite: '/images/casts/knight-b1.png'
    },
    role: {
      rower: true,
      predators: [{
        predator: 1,
        guardian: 0
      }, {
        predator: 2,
        guardian: 0
      }]
    }
  }, {
    id: 6,
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
        guardian: 0
      }, {
        predator: 3,
        guardian: 5
      }, {
        predator: 7,
        guardian: 5
      }]
    }
  }, {
    id: 7,
    name: 'C国騎士',
    description: '他国の騎士が目を離すとその国の王女を襲う。',
    appearance: {
      sprite: '/images/casts/knight-c1.png'
    },
    role: {
      rower: true,
      predators: [{
        predator: 1,
        guardian: 0
      }, {
        predator: 2,
        guardian: 0
      }]
    }
  }, {
    id: 8,
    name: 'C国王女1',
    appearance: {
      sprite: '/images/casts/princess-c1.png',
      ratio: 0.85
    },
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0
      }, {
        predator: 2,
        guardian: 0
      }, {
        predator: 3,
        guardian: 7
      }, {
        predator: 5,
        guardian: 7
      }]
    }
  }, {
    id: 9,
    name: '村人',
    appearance: {
      sprite: '/images/casts/villager1.png',
      ratio: 0.85
    },
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0
      }, {
        predator: 2,
        guardian: 0
      }]
    }
  }]
})
export default scene

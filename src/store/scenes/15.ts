import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 15,
  title: '王女親衛隊の攻防（中級編）',
  description: {
    conditions: '王女を他国の騎士から保護しつつ、すべての登場人物を最小回数で対岸に渡す',
    transportation: '3人乗りの舟が1<ruby>艘<rt>そう</rt></ruby>。すべての登場人物が舟を<ruby>漕<rt>こ</rt></ruby>げる。',
    tips: [
      '舟には3人まで乗せることができます。',
    ],
  },
  category: 'escorting-celebrity',
  level: 3,
  passing: 7,
  carriers: [{
    id: 0,
    capacity: 3,
    appearance: {
      sprite: '/images/carriers/boat3.png'
    }
  }],
  casts: [{
    id: 0,
    name: 'A国騎士',
    description: '他国の騎士が目を離すとその国の王女を襲う。',
    appearance: {
      sprite: '/images/casts/knight-a1.png'
    },
    role: {
    }
  }, {
    id: 1,
    name: 'A国王女1',
    appearance: {
      sprite: '/images/casts/princess-a1.png'
    },
    role: {
      predators: [{
        predator: 3,
        guardian: 0
      }, {
        predator: 6,
        guardian: 0
      }]
    }
  }, {
    id: 2,
    name: 'A国王女2',
    appearance: {
      sprite: '/images/casts/princess-a2.png'
    },
    role: {
      predators: [{
        predator: 3,
        guardian: 0
      }, {
        predator: 6,
        guardian: 0
      }]
    }
  }, {
    id: 3,
    name: 'B国騎士',
    description: '他国の騎士が目を離すとその国の王女を襲う。',
    appearance: {
      sprite: '/images/casts/knight-b1.png'
    },
    role: {
    }
  }, {
    id: 4,
    name: 'B国王女1',
    appearance: {
      sprite: '/images/casts/princess-b1.png'
    },
    role: {
      predators: [{
        predator: 0,
        guardian: 3
      }, {
        predator: 6,
        guardian: 3
      }]
    }
  }, {
    id: 5,
    name: 'B国王女2',
    appearance: {
      sprite: '/images/casts/princess-b2.png'
    },
    role: {
      predators: [{
        predator: 0,
        guardian: 3
      }, {
        predator: 6,
        guardian: 3
      }]
    }
  }, {
    id: 6,
    name: 'C国騎士',
    description: '他国の騎士が目を離すとその国の王女を襲う。',
    appearance: {
      sprite: '/images/casts/knight-c1.png'
    },
    role: {
    }
  }, {
    id: 7,
    name: 'C国王女1',
    appearance: {
      sprite: '/images/casts/princess-c1.png'
    },
    role: {
      predators: [{
        predator: 0,
        guardian: 6
      }, {
        predator: 3,
        guardian: 6
      }]
    }
  }, {
    id: 8,
    name: 'C国王女2',
    appearance: {
      sprite: '/images/casts/princess-c2.png'
    },
    role: {
      predators: [{
        predator: 0,
        guardian: 6
      }, {
        predator: 3,
        guardian: 6
      }]
    }
  }]
})
export default scene

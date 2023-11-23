import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 15,
  title: '王女親衛隊の攻防（中級編）',
  level: 3,
  category: 'escorting-celebrity',
  rules: {
    conditions: [
      '王女を他国の騎士から保護しつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '3人乗りの筏（いかだ）が1艘（そう）。すべての登場人物が筏（いかだ）を漕（こ）げる。',
    tips: [
      '筏（いかだ）には3人まで乗せることができます。',
    ],
  },
  passing: 7,
  carriers: [{
    id: 0,
    capacity: 3,
    appearance: {
      sprite: 'raft3'
    }
  }],
  casts: [{
    id: 0,
    name: 'A国騎士',
    rules: '他国の騎士が目を離すとその国の王女を襲う。',
    appearance: {
      sprite: 'knight11'
    },
    role: {
    }
  }, {
    id: 1,
    name: 'A国王女1',
    appearance: {
      sprite: 'princess11'
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
      sprite: 'princess12'
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
    rules: '他国の騎士が目を離すとその国の王女を襲う。',
    appearance: {
      sprite: 'knight21'
    },
    role: {
    }
  }, {
    id: 4,
    name: 'B国王女1',
    appearance: {
      sprite: 'princess21'
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
      sprite: 'princess22'
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
    rules: '他国の騎士が目を離すとその国の王女を襲う。',
    appearance: {
      sprite: 'knight31'
    },
    role: {
    }
  }, {
    id: 7,
    name: 'C国王女1',
    appearance: {
      sprite: 'princess31'
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
      sprite: 'princess32'
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

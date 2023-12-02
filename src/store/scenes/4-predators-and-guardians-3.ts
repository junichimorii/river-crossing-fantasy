import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 29,
  title: '一触即発パーティ（上級編3）',
  level: 4,
  category: 'predators-and-guardians',
  rules: {
    conditions: [
      '登場人物をそれぞれの天敵から保護しつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。ただし筏（いかだ）を漕（こ）げるのは魔獣使いと騎士のみ。',
    tips: [
      '家族の川渡りとして知られているパズルを改変したものです。',
    ],
  },
  passing: 17,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: {
      sprite: 'raft2'
    }
  }],
  casts: [{
    id: 0,
    name: '魔獣使い',
    appearance: {
      sprite: 'beasttamer1'
    },
    role: {
      rower: true
    },
  }, {
    id: 1,
    name: '魔獣',
    description: '魔獣使いが目を離すと魔獣使い以外の全員を襲う。',
    appearance: {
      sprite: 'therianthropy1'
    },
    role: {
      rower: false
    }
  }, {
    id: 2,
    name: 'A国騎士',
    description: 'B国騎士が目を離すとB国王女を襲う。',
    appearance: {
      sprite: 'knight11'
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
      sprite: 'princess11'
    },
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0
      }, {
        predator: 5,
        guardian: 2
      }]
    }
  }, {
    id: 4,
    name: 'A国王女2',
    appearance: {
      sprite: 'princess12'
    },
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0
      }, {
        predator: 5,
        guardian: 2
      }]
    }
  }, {
    id: 5,
    name: 'B国騎士',
    description: 'A国騎士が目を離すとA国王女を襲う。',
    appearance: {
      sprite: 'knight21'
    },
    role: {
      rower: true,
      predators: [{
        predator: 1,
        guardian: 0
      }]
    }
  }, {
    id: 6,
    name: 'B国王女1',
    appearance: {
      sprite: 'princess21'
    },
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0
      }, {
        predator: 2,
        guardian: 5
      }]
    }
  }, {
    id: 7,
    name: 'B国王女2',
    appearance: {
      sprite: 'princess22'
    },
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0
      }, {
        predator: 2,
        guardian: 5
      }]
    }
  }]
})
export default scene

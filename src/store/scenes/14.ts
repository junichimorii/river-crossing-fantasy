import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 14,
  title: '一触即発パーティ（中級編）',
  description: {
    conditions: '登場人物を敵から保護しつつ、すべての登場人物を最小回数で対岸に渡す',
    transportation: '2人乗りの舟が1<ruby>艘<rt>そう</rt></ruby>。ただし舟を<ruby>漕<rt>こ</rt></ruby>げるのは魔獣使いと騎士のみ。',
  },
  category: 'predators-and-guardians',
  level: 3,
  passing: 9,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: {
      sprite: 'boat2'
    }
  }],
  casts: [{
    id: 0,
    name: '魔獣使い',
    appearance: {
      sprite: 'beasttamer1'
    },
    role: {
      rower: true,
    }
  }, {
    id: 1,
    name: '魔獣',
    description: '魔獣使いが目を離すと魔獣使い以外の全員を襲う。',
    appearance: {
      sprite: 'therianthropy1',
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
      sprite: 'knight11'
    },
    role: {
      rower: true,
      predators: [{
        predator: 1,
        guardian: 0,
      }]
    }
  }, {
    id: 3,
    name: 'A国王女',
    appearance: {
      sprite: 'princess11',
      ratio: 0.85
    },
    role: {
      rower: false,
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
      sprite: 'knight21'
    },
    role: {
      rower: true,
      predators: [{
        predator: 1,
        guardian: 0,
      }]
    }
  }, {
    id: 5,
    name: 'B国王女',
    appearance: {
      sprite: 'princess21',
      ratio: 0.85
    },
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0
      }, {
        predator: 2,
        guardian: 4
      }]
    }
  }]
})
export default scene

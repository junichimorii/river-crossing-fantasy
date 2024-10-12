import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 26,
  title: '一触即発パーティ(9)',
  category: 8,
  order: 9,
  rules: {
    conditions: [
      '登場人物をそれぞれの天敵から保護しつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '3人乗りの筏（いかだ）が1艘（そう）。ただし筏（いかだ）を漕（こ）げるのは魔獣使いと騎士のみ。',
  },
  passing: 9,
  carriers: [{
    id: 0,
    capacity: 3,
    appearance: 'raft3'
  }],
  casts: [{
    id: 0,
    name: '魔獣使い',
    appearance: 'beasttamer1',
    role: {
      rower: true
    },
  }, {
    id: 1,
    name: '魔獣a',
    description: '魔獣使いが目を離すと魔獣使い以外の全員を襲う。',
    appearance: 'therianthropy1',
    role: {
      rower: false
    }
  }, {
    id: 2,
    name: '魔獣b',
    description: '魔獣使いが目を離すと魔獣使い以外の全員を襲う。',
    appearance: 'therianthropy2',
    role: {
      rower: false
    }
  }, {
    id: 3,
    name: '青国騎士',
    description: '他国の騎士が目を離すとその国の王女を襲う。',
    appearance: 'knight11',
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
    name: '青国王女',
    appearance: 'princess11',
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
    name: '赤国騎士',
    description: '他国の騎士が目を離すとその国の王女を襲う。',
    appearance: 'knight21',
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
    name: '赤国王女',
    appearance: 'princess21',
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
    name: '緑国騎士',
    description: '他国の騎士が目を離すとその国の王女を襲う。',
    appearance: 'knight31',
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
    name: '緑国王女',
    appearance: 'princess31',
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
    appearance: 'villager1',
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

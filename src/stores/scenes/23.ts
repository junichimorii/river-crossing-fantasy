import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 41,
  title: '魔獣使いは苦労が絶えない(3)',
  category: 2,
  order: 3,
  level: 2,
  rules: {
    conditions: [
      '村人を魔獣から保護しつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '3人乗りの筏（いかだ）が1艘（そう）。ただし筏（いかだ）を漕（こ）げるのは魔獣使いのみ。',
  },
  passing: 7,
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
    }
  }, {
    id: 1,
    name: '魔獣a',
    description: '魔獣使いが目を離すと村人を襲う。',
    appearance: 'therianthropy1',
    role: {
      rower: false
    }
  }, {
    id: 2,
    name: '魔獣b',
    description: '魔獣使いが目を離すと村人を襲う。',
    appearance: 'therianthropy2',
    role: {
      rower: false
    }
  }, {
    id: 3,
    name: '魔獣c',
    description: '魔獣使いが目を離すと村人を襲う。',
    appearance: 'therianthropy3',
    role: {
      rower: false
    }
  }, {
    id: 4,
    name: '村人a',
    appearance: 'villager1',
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0,
      }, {
        predator: 2,
        guardian: 0,
      }, {
        predator: 3,
        guardian: 0,
      }]
    }
  }, {
    id: 5,
    name: '村人b',
    appearance: 'villager2',
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0,
      }, {
        predator: 2,
        guardian: 0,
      }, {
        predator: 3,
        guardian: 0,
      }]
    }
  }]
})
export default scene

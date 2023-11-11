import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 12,
  title: '防衛戦線（初級編2）',
  description: {
    conditions: '王女を他国の騎士から保護しつつ、すべてのキャラクターを最小回数で対岸に渡す',
    transportation: '2人乗りの舟が1艘。ただし舟を漕げるのは騎士のみ。',
  },
  category: 'escorting-celebrity',
  level: 2,
  passing: 5,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: {
      sprite: '/images/carriers/boat2.png'
    }
  }],
  casts: [{
    id: 0,
    name: 'A国騎士',
    description: '他国の騎士が目を離すと他国の王女を襲う。',
    appearance: {
      sprite: '/images/casts/knight-a1.png'
    },
    role: {
      rower: true,
    }
  }, {
    id: 1,
    name: 'A国王女',
    appearance: {
      sprite: '/images/casts/princess-a1.png',
      ratio: 0.85
    },
    role: {
      rower: false,
      predators: [{
        predator: 2,
        guardian: 0,
      }]
    }
  }, {
    id: 2,
    name: 'B国騎士',
    description: '他国の騎士が目を離すと他国の王女を襲う。',
    appearance: {
      sprite: '/images/casts/knight-b1.png'
    },
    role: {
      rower: true,
    }
  }, {
    id: 3,
    name: 'B国王女',
    appearance: {
      sprite: '/images/casts/princess-b1.png',
      ratio: 0.85
    },
    role: {
      rower: false,
      predators: [{
        predator: 0,
        guardian: 2,
      }]
    }
  }]
})
export default scene

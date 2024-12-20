import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 55,
  title: '王女親衛隊の攻防(4)',
  category: 40,
  order: 4,
  rules: {
    conditions: [
      '王女を他国の騎士から保護しつつ、すべての登場人物を対岸に渡す',
    ],
    tips: [
      '「王女親衛隊の攻防(3)」の青国王女が2人になっています。',
    ],
  },
  passing: 13,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: 'raft2'
  }],
  casts: [{
    id: 0,
    name: '青国騎士',
    description: '他国の騎士が目を離すとその国の王女を襲う。',
    appearance: 'knight1',
    role: {
      rower: true
    }
  }, {
    id: 1,
    name: '青国王女A',
    appearance: 'princess11',
    role: {
      rower: true,
      predators: [{
        predator: 3,
        guardian: 0
      }, {
        predator: 5,
        guardian: 0
      }]
    }
  }, {
    id: 2,
    name: '青国王女B',
    appearance: 'princess12',
    role: {
      rower: true,
      predators: [{
        predator: 3,
        guardian: 0
      }, {
        predator: 5,
        guardian: 0
      }]
    }
  }, {
    id: 3,
    name: '赤国騎士',
    description: '他国の騎士が目を離すとその国の王女を襲う。',
    appearance: 'knight2',
    role: {
      rower: true
    }
  }, {
    id: 4,
    name: '赤国王女',
    appearance: 'princess21',
    role: {
      rower: true,
      predators: [{
        predator: 0,
        guardian: 3
      }, {
        predator: 5,
        guardian: 3
      }]
    }
  }, {
    id: 5,
    name: '緑国騎士',
    description: '他国の騎士が目を離すとその国の王女を襲う。',
    appearance: 'knight3',
    role: {
      rower: true
    }
  }, {
    id: 6,
    name: '緑国王女',
    appearance: 'princess31',
    role: {
      rower: true,
      predators: [{
        predator: 0,
        guardian: 5
      }, {
        predator: 3,
        guardian: 5
      }]
    }
  }]
})
export default scene

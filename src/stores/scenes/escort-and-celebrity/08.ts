import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 57,
  title: '王女親衛隊の攻防(8)',
  category: 40,
  order: 8,
  rules: {
    conditions: [
      '王女を他国の騎士から保護しつつ、すべての登場人物を対岸に渡す',
    ],
    tips: [
      '緑国騎士と紫国騎士には護衛対象の王女がいません。青国王女と赤国王女は他3か国の騎士から狙われています。',
    ],
  },
  passing: 9,
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
    name: '青国王女',
    appearance: 'princess11',
    role: {
      rower: true,
      predators: [{
        predator: 2,
        guardian: 0
      }, {
        predator: 4,
        guardian: 0
      }, {
        predator: 5,
        guardian: 0
      }]
    }
  }, {
    id: 2,
    name: '赤国騎士',
    description: '他国の騎士が目を離すとその国の王女を襲う。',
    appearance: 'knight2',
    role: {
      rower: true
    }
  }, {
    id: 3,
    name: '赤国王女',
    appearance: 'princess21',
    role: {
      rower: true,
      predators: [{
        predator: 0,
        guardian: 2
      }, {
        predator: 4,
        guardian: 2
      }, {
        predator: 5,
        guardian: 2
      }]
    }
  }, {
    id: 4,
    name: '緑国騎士',
    description: '他国の騎士が目を離すとその国の王女を襲う。',
    appearance: 'knight3',
    role: {
      rower: true
    }
  }, {
    id: 5,
    name: '紫国騎士',
    description: '他国の騎士が目を離すとその国の王女を襲う。',
    appearance: 'knight4',
    role: {
      rower: true
    }
  }]
})
export default scene

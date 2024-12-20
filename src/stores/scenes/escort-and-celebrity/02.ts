import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 54,
  title: '王女親衛隊の攻防(2)',
  category: 40,
  order: 2,
  rules: {
    conditions: [
      '王女を他国の騎士から保護しつつ、すべての登場人物を対岸に渡す',
    ],
    transportation: '筏（いかだ）を漕（こ）げるのは各国の騎士のみ。',
    tips: [
      '「王女親衛隊の攻防(1)」と似ていますが、王女は筏（いかだ）を漕（こ）ぐことができません。',
    ],
  },
  passing: 5,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: 'raft2'
  }],
  casts: [{
    id: 0,
    name: '青国騎士',
    description: '他国の騎士が目を離すと他国の王女を襲う。',
    appearance: 'knight1',
    role: {
      rower: true
    }
  }, {
    id: 1,
    name: '青国王女',
    appearance: 'princess11',
    role: {
      rower: false,
      predators: [{
        predator: 2,
        guardian: 0,
      }]
    }
  }, {
    id: 2,
    name: '赤国騎士',
    description: '他国の騎士が目を離すと他国の王女を襲う。',
    appearance: 'knight2',
    role: {
      rower: true
    }
  }, {
    id: 3,
    name: '赤国王女',
    appearance: 'princess21',
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

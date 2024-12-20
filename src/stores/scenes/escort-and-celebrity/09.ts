import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 94,
  title: '王女親衛隊の攻防(9)',
  category: 40,
  order: 9,
  rules: {
    conditions: [
      '王女を他国の騎士から保護しつつ、すべての登場人物を対岸に渡す',
    ],
    tips: [
      '「王女親衛隊の攻防(8)」の青国王女が3人、赤国王女が2人になっています。',
    ],
  },
  passing: 15,
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
        predator: 4,
        guardian: 0
      }, {
        predator: 7,
        guardian: 0
      }, {
        predator: 8,
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
        predator: 4,
        guardian: 0
      }, {
        predator: 7,
        guardian: 0
      }, {
        predator: 8,
        guardian: 0
      }]
    }
  }, {
    id: 3,
    name: '青国王女C',
    appearance: 'princess13',
    role: {
      rower: true,
      predators: [{
        predator: 4,
        guardian: 0
      }, {
        predator: 7,
        guardian: 0
      }, {
        predator: 8,
        guardian: 0
      }]
    }
  }, {
    id: 4,
    name: '赤国騎士',
    description: '他国の騎士が目を離すとその国の王女を襲う。',
    appearance: 'knight2',
    role: {
      rower: true
    }
  }, {
    id: 5,
    name: '赤国王女A',
    appearance: 'princess21',
    role: {
      rower: true,
      predators: [{
        predator: 0,
        guardian: 4
      }, {
        predator: 7,
        guardian: 4
      }, {
        predator: 8,
        guardian: 4
      }]
    }
  }, {
    id: 6,
    name: '赤国王女B',
    appearance: 'princess22',
    role: {
      rower: true,
      predators: [{
        predator: 0,
        guardian: 4
      }, {
        predator: 7,
        guardian: 4
      }, {
        predator: 8,
        guardian: 4
      }]
    }
  }, {
    id: 7,
    name: '緑国騎士',
    description: '他国の騎士が目を離すとその国の王女を襲う。',
    appearance: 'knight3',
    role: {
      rower: true
    }
  }, {
    id: 8,
    name: '紫国騎士',
    description: '他国の騎士が目を離すとその国の王女を襲う。',
    appearance: 'knight4',
    role: {
      rower: true
    }
  }]
})
export default scene

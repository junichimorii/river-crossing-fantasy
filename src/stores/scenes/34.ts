import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 39,
  title: '王女親衛隊の攻防(4)',
  category: 3,
  order: 3,
  level: 3,
  rules: {
    conditions: [
      '王女を他国の騎士から保護しつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '3人乗りの筏（いかだ）が1艘（そう）。ただし筏（いかだ）を漕（こ）げるのは各国の騎士のみ。',
    tips: [
      '「王女親衛隊の攻防(3)」と似ていますが、王女は筏（いかだ）を漕（こ）ぐことができません。',
    ],
  },
  passing: 9,
  carriers: [{
    id: 0,
    capacity: 3,
    appearance: 'raft3'
  }],
  casts: [{
    id: 0,
    name: 'A国騎士',
    description: '他国の騎士が目を離すとその国の王女を襲う。',
    appearance: 'knight11',
    role: {
      rower: true
    }
  }, {
    id: 1,
    name: 'A国王女1',
    appearance: 'princess11',
    role: {
      rower: false,
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
    appearance: 'princess12',
    role: {
      rower: false,
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
    description: '他国の騎士が目を離すとその国の王女を襲う。',
    appearance: 'knight21',
    role: {
      rower: true
    }
  }, {
    id: 4,
    name: 'B国王女1',
    appearance: 'princess21',
    role: {
      rower: false,
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
    appearance: 'princess22',
    role: {
      rower: false,
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
    description: '他国の騎士が目を離すとその国の王女を襲う。',
    appearance: 'knight31',
    role: {
      rower: true
    }
  }, {
    id: 7,
    name: 'C国王女1',
    appearance: 'princess31',
    role: {
      rower: false,
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
    appearance: 'princess32',
    role: {
      rower: false,
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

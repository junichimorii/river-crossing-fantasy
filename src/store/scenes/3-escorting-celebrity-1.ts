import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 17,
  title: '王女親衛隊の攻防（中級編1）',
  level: 3,
  category: 'escorting-celebrity',
  rules: {
    conditions: [
      '王女を他国の騎士から保護しつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。すべての登場人物が筏（いかだ）を漕（こ）げる。',
    tips: [
      '古くから「jealous husbands problem」（嫉妬（しっと）深い夫の問題）の名で知られる川渡りパズルを改変したものです。',
    ],
  },
  passing: 11,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: 'raft2'
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
    name: 'A国王女',
    appearance: 'princess11',
    role: {
      rower: true,
      predators: [{
        predator: 2,
        guardian: 0
      }, {
        predator: 4,
        guardian: 0
      }]
    }
  }, {
    id: 2,
    name: 'B国騎士',
    description: '他国の騎士が目を離すとその国の王女を襲う。',
    appearance: 'knight21',
    role: {
      rower: true
    }
  }, {
    id: 3,
    name: 'B国王女',
    appearance: 'princess21',
    role: {
      rower: true,
      predators: [{
        predator: 0,
        guardian: 2
      }, {
        predator: 4,
        guardian: 2
      }]
    }
  }, {
    id: 4,
    name: 'C国騎士',
    description: '他国の騎士が目を離すとその国の王女を襲う。',
    appearance: 'knight31',
    role: {
      rower: true
    }
  }, {
    id: 5,
    name: 'C国王女',
    appearance: 'princess31',
    role: {
      rower: true,
      predators: [{
        predator: 0,
        guardian: 4
      }, {
        predator: 2,
        guardian: 4
      }]
    }
  }]
})
export default scene

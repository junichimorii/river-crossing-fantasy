import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 103,
  title: '王女親衛隊の往還(1)',
  category: 90,
  order: 2,
  rules: {
    conditions: [
      '王女を他国の騎士から保護しつつ、すべての登場人物を初期位置の対岸に渡す',
    ],
    tips: [
      '赤国の騎士と王女たちが対岸にいる状態でスタートします。',
      '騎士は、他国の王女が近くにおり、かつその国の騎士が近くにいない場合、王女を襲います。'
    ],
  },
  passing: 4,
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
    coord: -1,
    role: {
      rower: true
    }
  }, {
    id: 1,
    name: '青国王女a',
    appearance: 'princess11',
    coord: -1,
    role: {
      rower: true,
      predators: [{
        predator: 3,
        guardian: 0,
      }]
    }
  }, {
    id: 2,
    name: '青国王女b',
    appearance: 'princess12',
    coord: -1,
    role: {
      rower: true,
      predators: [{
        predator: 3,
        guardian: 0,
      }]
    }
  }, {
    id: 3,
    name: '赤国騎士',
    description: '他国の騎士が目を離すと他国の王女を襲う。',
    appearance: 'knight2',
    coord: 1,
    role: {
      rower: true
    }
  }, {
    id: 4,
    name: '赤国王女a',
    appearance: 'princess21',
    coord: 1,
    role: {
      rower: true,
      predators: [{
        predator: 0,
        guardian: 3,
      }]
    }
  }, {
    id: 5,
    name: '赤国王女b',
    appearance: 'princess22',
    coord: 1,
    role: {
      rower: true,
      predators: [{
        predator: 0,
        guardian: 3,
      }]
    }
  }]
})
export default scene

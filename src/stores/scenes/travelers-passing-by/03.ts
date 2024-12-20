import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 104,
  title: '王女親衛隊の往還(2)',
  category: 90,
  order: 3,
  rules: {
    conditions: [
      '王女を他国の騎士から保護しつつ、すべての登場人物を初期位置の対岸に渡す',
    ],
    tips: [
      '赤国の騎士と王女たちが対岸にいる状態でスタートします。',
      '騎士は、他国の王女が近くにおり、かつその国の騎士が近くにいない場合、王女を襲います。'
    ],
  },
  passing: 6,
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
    coord: -1,
    role: {
      rower: true
    }
  }, {
    id: 1,
    name: '青国王女A',
    appearance: 'princess11',
    coord: -1,
    role: {
      rower: true,
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
    name: '青国王女B',
    appearance: 'princess12',
    coord: -1,
    role: {
      rower: true,
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
    name: '赤国騎士',
    description: '他国の騎士が目を離すとその国の王女を襲う。',
    appearance: 'knight2',
    coord: 1,
    role: {
      rower: true
    }
  }, {
    id: 4,
    name: '赤国王女A',
    appearance: 'princess21',
    coord: 1,
    role: {
      rower: true,
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
    name: '赤国王女B',
    appearance: 'princess22',
    coord: 1,
    role: {
      rower: true,
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
    name: '緑国騎士',
    description: '他国の騎士が目を離すとその国の王女を襲う。',
    appearance: 'knight3',
    coord: -1,
    role: {
      rower: true
    }
  }, {
    id: 7,
    name: '緑国王女A',
    appearance: 'princess31',
    coord: -1,
    role: {
      rower: true,
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
    name: '緑国王女B',
    appearance: 'princess32',
    coord: -1,
    role: {
      rower: true,
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

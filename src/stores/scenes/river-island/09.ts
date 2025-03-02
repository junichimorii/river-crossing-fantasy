import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 76,
  title: '一触即発パーティ+(5)',
  category: 95,
  order: 9,
  rules: {
    conditions: [
      '登場人物をそれぞれの天敵から保護しつつ、すべての登場人物を対岸に渡す',
    ],
    transportation: '筏（いかだ）を漕（こ）げるのは魔獣使いと騎士のみ。',
    tips: [
      '魔獣は、魔獣使いが目を離すと、近くにいる全員を襲います。',
      '騎士は、他国の王女が近くにおり、かつその国の騎士が近くにいない場合、王女を襲います。'
    ],
  },
  landscape: {
    island: true
  },
  passing: 38,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: 'raft2'
  }],
  crews: [{
    id: 0,
    name: '魔獣使い',
    appearance: 'beasttamer1',
    role: {
      rower: true
    },
  }, {
    id: 1,
    name: '魔獣',
    description: '魔獣使いが目を離すと近くにいる全員を襲う。',
    appearance: 'therianthropy1',
    role: {
      rower: false,
      demihuman: true
    }
  }, {
    id: 2,
    name: '青国騎士',
    description: '他国の騎士が目を離すと他国の王女を襲う。',
    appearance: 'knight1',
    role: {
      rower: true,
      predators: [{
        predator: 1,
        guardian: 0
      }]
    }
  }, {
    id: 3,
    name: '青国王女',
    appearance: 'princess11',
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0
      }, {
        predator: 4,
        guardian: 2
      }, {
        predator: 6,
        guardian: 2
      }, {
        predator: 8,
        guardian: 2
      }]
    }
  }, {
    id: 4,
    name: '赤国騎士',
    description: '他国の騎士が目を離すと他国の王女を襲う。',
    appearance: 'knight2',
    role: {
      rower: true,
      predators: [{
        predator: 1,
        guardian: 0
      }]
    }
  }, {
    id: 5,
    name: '赤国王女',
    appearance: 'princess21',
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0
      }, {
        predator: 2,
        guardian: 4
      }, {
        predator: 6,
        guardian: 4
      }, {
        predator: 8,
        guardian: 4
      }]
    }
  }, {
    id: 6,
    name: '緑国騎士',
    description: '他国の騎士が目を離すと他国の王女を襲う。',
    appearance: 'knight3',
    role: {
      rower: true,
      predators: [{
        predator: 1,
        guardian: 0
      }]
    }
  }, {
    id: 7,
    name: '緑国王女',
    appearance: 'princess31',
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0
      }, {
        predator: 2,
        guardian: 6
      }, {
        predator: 4,
        guardian: 6
      }, {
        predator: 8,
        guardian: 6
      }]
    }
  }, {
    id: 8,
    name: '紫国騎士',
    description: '他国の騎士が目を離すと他国の王女を襲う。',
    appearance: 'knight4',
    role: {
      rower: true,
      predators: [{
        predator: 1,
        guardian: 0
      }]
    }
  }, {
    id: 9,
    name: '紫国王女',
    appearance: 'princess41',
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0
      }, {
        predator: 2,
        guardian: 8
      }, {
        predator: 4,
        guardian: 8
      }, {
        predator: 6,
        guardian: 8
      }]
    }
  }]
})
export default scene

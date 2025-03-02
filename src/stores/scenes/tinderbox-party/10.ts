import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 97,
  title: '一触即発パーティ(10)',
  category: 80,
  order: 10,
  rules: {
    conditions: [
      '登場人物をそれぞれの天敵から保護しつつ、すべての登場人物を対岸に渡す',
    ],
    transportation: '筏（いかだ）を漕（こ）げるのは魔獣使い、死霊使い、騎士のみ。',
    tips: [
      '魔獣は、魔獣使いが目を離すと、近くにいる死霊以外の全員を襲います。',
      '死霊は、死霊使いが目を離すと、近くにいる魔獣以外の全員を襲います。',
      '騎士は、他国の王女が近くにおり、かつその国の騎士が近くにいない場合、王女を襲います。'
    ],
  },
  passing: 11,
  carriers: [{
    id: 0,
    capacity: 3,
    appearance: 'raft3'
  }],
  crews: [{
    id: 0,
    name: '魔獣使い',
    appearance: 'beasttamer1',
    role: {
      rower: true,
      predators: [{
        predator: 3,
        guardian: 2,
      }]
    },
  }, {
    id: 1,
    name: '魔獣',
    description: '魔獣使いが目を離すと死霊以外の全員を襲う。',
    appearance: 'therianthropy1',
    role: {
      rower: false,
    }
  }, {
    id: 2,
    name: '死霊使い',
    appearance: 'necromancer1',
    role: {
      rower: true,
      predators: [{
        predator: 1,
        guardian: 0,
      }]
    }
  }, {
    id: 3,
    name: '死霊',
    description: '死霊使いが目を離すと魔獣以外の全員を襲う。',
    appearance: 'undead1',
    role: {
      rower: false
    }
  }, {
    id: 4,
    name: '青国騎士',
    description: '他国の騎士が目を離すと他国の王女を襲う。',
    appearance: 'knight1',
    role: {
      rower: true,
      predators: [{
        predator: 1,
        guardian: 0
      }, {
        predator: 3,
        guardian: 2,
      }]
    }
  }, {
    id: 5,
    name: '青国王女',
    appearance: 'princess11',
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0
      }, {
        predator: 3,
        guardian: 2
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
    name: '赤国騎士',
    description: '他国の騎士が目を離すと他国の王女を襲う。',
    appearance: 'knight2',
    role: {
      rower: true,
      predators: [{
        predator: 1,
        guardian: 0
      }, {
        predator: 3,
        guardian: 2,
      }]
    }
  }, {
    id: 7,
    name: '赤国王女',
    appearance: 'princess21',
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0
      }, {
        predator: 3,
        guardian: 2
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
    name: '緑国騎士',
    description: '他国の騎士が目を離すと他国の王女を襲う。',
    appearance: 'knight3',
    role: {
      rower: true,
      predators: [{
        predator: 1,
        guardian: 0
      }, {
        predator: 3,
        guardian: 2,
      }]
    }
  }, {
    id: 9,
    name: '緑国王女',
    appearance: 'princess31',
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0
      }, {
        predator: 3,
        guardian: 2
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

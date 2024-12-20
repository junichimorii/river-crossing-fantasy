import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 65,
  title: '魔獣使いと死霊使い(3)',
  category: 30,
  order: 6,
  rules: {
    conditions: [
      '登場人物をそれぞれの天敵から保護しつつ、すべての登場人物を対岸に渡す',
    ],
    transportation: '筏（いかだ）を漕（こ）げるのは魔獣使い、死霊使い、従者のみ。',
    tips: [
      '魔獣は、魔獣使いが目を離すと、近くにいる死霊以外の全員を襲います。',
      'また死霊は、死霊使いが目を離すと、近くにいる魔獣以外の全員を襲います。',
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
    name: '魔獣使い',
    appearance: 'beasttamer1',
    role: {
      rower: true,
      predators: [{
        predator: 3,
        guardian: 2,
      }]
    }
  }, {
    id: 1,
    name: '魔獣',
    description: '魔獣使いが目を離すと死霊以外を襲う。',
    appearance: 'therianthropy1',
    role: {
      rower: false
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
    description: '死霊使いが目を離すと魔獣以外を襲う。',
    appearance: 'undead1',
    role: {
      rower: false
    }
  }, {
    id: 4,
    name: '従者',
    appearance: 'maid11',
    role: {
      rower: true,
      predators: [{
        predator: 1,
        guardian: 0,
      }, {
        predator: 3,
        guardian: 2,
      }]
    }
  }, {
    id: 5,
    name: '王女a',
    appearance: 'princess11',
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0,
      }, {
        predator: 3,
        guardian: 2,
      }]
    }
  }, {
    id: 6,
    name: '王女b',
    appearance: 'princess12',
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0,
      }, {
        predator: 3,
        guardian: 2,
      }]
    }
  }]
})
export default scene

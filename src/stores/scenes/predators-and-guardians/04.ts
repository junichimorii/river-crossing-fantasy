import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 52,
  title: '魔獣使いと死霊使い(1)',
  category: 30,
  order: 4,
  rules: {
    conditions: [
      '登場人物をそれぞれの天敵から保護しつつ、すべての登場人物を対岸に渡す',
    ],
    transportation: '筏（いかだ）を漕（こ）げるのは魔獣使いと死霊使いのみ。',
    tips: [
      '魔獣は、魔獣使いが目を離すと、近くにいる死霊使いを襲います。',
      'また死霊は、死霊使いが目を離すと、近くにいる魔獣使いを襲います。',
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
    description: '魔獣使いが目を離すと死霊使いを襲う。',
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
    description: '死霊使いが目を離すと魔獣使いを襲う。',
    appearance: 'undead1',
    role: {
      rower: false
    }
  }]
})
export default scene

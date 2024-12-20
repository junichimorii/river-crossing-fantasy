import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 61,
  title: '魔獣使いと死霊使い(4)',
  category: 30,
  order: 7,
  rules: {
    conditions: [
      '登場人物をそれぞれの天敵から保護しつつ、すべての登場人物を対岸に渡す',
    ],
    transportation: '筏（いかだ）を漕（こ）げるのは魔獣使いと死霊使いのみ。',
    tips: [
      '魔獣は、魔獣使いが目を離すと、近くにいる死霊使いと村人を襲います。',
      'また死霊は、死霊使いが目を離すと、近くにいる魔獣使いと村人を襲います。',
    ],
  },
  passing: 13,
  carriers: [{
    id: 0,
    capacity: 3,
    appearance: 'raft3'
  }],
  casts: [{
    id: 0,
    name: '魔獣使い',
    appearance: 'beasttamer1',
    role: {
      rower: true,
      predators: [{
        predator: 5,
        guardian: 4,
      }, {
        predator: 6,
        guardian: 4,
      }, {
        predator: 7,
        guardian: 4,
      }]
    }
  }, {
    id: 1,
    name: '魔獣a',
    description: '魔獣使いが目を離すと死霊以外を襲う。',
    appearance: 'therianthropy1',
    role: {
      rower: false
    }
  }, {
    id: 2,
    name: '魔獣b',
    description: '魔獣使いが目を離すと死霊以外を襲う。',
    appearance: 'therianthropy2',
    role: {
      rower: false
    }
  }, {
    id: 3,
    name: '魔獣c',
    description: '魔獣使いが目を離すと死霊以外を襲う。',
    appearance: 'therianthropy3',
    role: {
      rower: false
    }
  }, {
    id: 4,
    name: '死霊使い',
    appearance: 'necromancer1',
    role: {
      rower: true,
      predators: [{
        predator: 1,
        guardian: 0,
      }, {
        predator: 2,
        guardian: 0,
      }, {
        predator: 3,
        guardian: 0,
      }]
    }
  }, {
    id: 5,
    name: '死霊a',
    description: '死霊使いが目を離すと魔獣以外を襲う。',
    appearance: 'undead1',
    role: {
      rower: false
    }
  }, {
    id: 6,
    name: '死霊b',
    description: '死霊使いが目を離すと魔獣以外を襲う。',
    appearance: 'undead2',
    role: {
      rower: false
    }
  }, {
    id: 7,
    name: '死霊c',
    description: '死霊使いが目を離すと魔獣以外を襲う。',
    appearance: 'undead3',
    role: {
      rower: false
    }
  }, {
    id: 8,
    name: '村人',
    appearance: 'villager1',
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0,
      }, {
        predator: 2,
        guardian: 0,
      }, {
        predator: 3,
        guardian: 0,
      }, {
        predator: 5,
        guardian: 4,
      }, {
        predator: 6,
        guardian: 4,
      }, {
        predator: 7,
        guardian: 4,
      }]
    }
  }]
})
export default scene

import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 105,
  title: '使役者たちの往還(1)',
  category: 90,
  order: 4,
  rules: {
    conditions: [
      '登場人物をそれぞれの天敵から保護しつつ、すべての登場人物を初期位置の対岸に渡す',
    ],
    tips: [
      '死霊使いと死霊たちが対岸にいる状態でスタートします。',
      '魔獣は、魔獣使いが目を離すと、近くにいる死霊使いを襲います。',
      '死霊は、死霊使いが目を離すと、近くにいる魔獣使いを襲います。',
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
    name: '魔獣使い',
    appearance: 'beasttamer1',
    coord: -1,
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
    name: '魔獣A',
    description: '魔獣使いが目を離すと死霊使いを襲う。',
    appearance: 'therianthropy1',
    coord: -1,
    role: {
      rower: true
    }
  }, {
    id: 2,
    name: '魔獣B',
    description: '魔獣使いが目を離すと死霊使いを襲う。',
    appearance: 'therianthropy2',
    coord: -1,
    role: {
      rower: true
    }
  }, {
    id: 3,
    name: '魔獣C',
    description: '魔獣使いが目を離すと死霊使いを襲う。',
    appearance: 'therianthropy3',
    coord: -1,
    role: {
      rower: true
    }
  }, {
    id: 4,
    name: '死霊使い',
    appearance: 'necromancer1',
    coord: 1,
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
    name: '死霊A',
    description: '死霊使いが目を離すと魔獣使いを襲う。',
    appearance: 'undead1',
    coord: 1,
    role: {
      rower: true
    }
  }, {
    id: 6,
    name: '死霊B',
    description: '死霊使いが目を離すと魔獣使いを襲う。',
    appearance: 'undead2',
    coord: 1,
    role: {
      rower: true
    }
  }, {
    id: 7,
    name: '死霊C',
    description: '死霊使いが目を離すと魔獣使いを襲う。',
    appearance: 'undead3',
    coord: 1,
    role: {
      rower: true
    }
  }]
})
export default scene

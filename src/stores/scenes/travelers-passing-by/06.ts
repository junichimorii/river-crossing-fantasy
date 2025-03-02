import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 107,
  title: '旅人たちの往還(1)',
  category: 90,
  order: 6,
  rules: {
    conditions: [
      '登場人物をそれぞれの天敵から保護しつつ、すべての登場人物を初期位置の対岸に渡す',
    ],
    transportation: '筏（いかだ）を漕（こ）げるのは魔獣使い、死霊使い、騎士のみ。',
    tips: [
      '死霊使いと死霊たち、赤国の騎士と王女たちが対岸にいる状態でスタートします。',
      '魔獣は、魔獣使いが目を離すと、近くにいる死霊以外の全員を襲います。',
      '死霊は、死霊使いが目を離すと、近くにいる魔獣以外の全員を襲います。',
      '騎士は、他国の王女が近くにおり、かつその国の騎士が近くにいない場合、王女を襲います。'
    ],
  },
  passing: 14,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: 'raft2'
  }],
  crews: [{
    id: 0,
    name: '魔獣使い',
    appearance: 'beasttamer1',
    coord: -1,
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
    description: '魔獣使いが目を離すと死霊以外の全員を襲う。',
    appearance: 'therianthropy1',
    coord: -1,
    role: {
      rower: false
    }
  }, {
    id: 2,
    name: '死霊使い',
    appearance: 'necromancer1',
    coord: 1,
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
    coord: 1,
    role: {
      rower: false
    }
  }, {
    id: 4,
    name: '青国騎士',
    description: '赤国騎士が目を離すと赤国王女を襲う。',
    appearance: 'knight1',
    coord: -1,
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
    name: '青国王女a',
    appearance: 'princess11',
    coord: -1,
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0
      }, {
        predator: 3,
        guardian: 2,
      }, {
        predator: 7,
        guardian: 4
      }]
    }
  }, {
    id: 6,
    name: '青国王女b',
    appearance: 'princess12',
    coord: -1,
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0
      }, {
        predator: 3,
        guardian: 2,
      }, {
        predator: 7,
        guardian: 4
      }]
    }
  }, {
    id: 7,
    name: '赤国騎士',
    description: '青国騎士が目を離すと青国王女を襲う。',
    appearance: 'knight2',
    coord: 1,
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
    id: 8,
    name: '赤国王女a',
    appearance: 'princess21',
    coord: 1,
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0
      }, {
        predator: 3,
        guardian: 2,
      }, {
        predator: 4,
        guardian: 7
      }]
    }
  }, {
    id: 9,
    name: '赤国王女b',
    appearance: 'princess22',
    coord: 1,
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0
      }, {
        predator: 3,
        guardian: 2,
      }, {
        predator: 4,
        guardian: 7
      }]
    }
  }]
})
export default scene

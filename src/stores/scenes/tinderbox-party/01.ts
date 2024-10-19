import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 19,
  title: '一触即発パーティ(1)',
  category: 10,
  order: 1,
  rules: {
    conditions: [
      '登場人物をそれぞれの天敵から保護しつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。ただし筏（いかだ）を漕（こ）げるのは魔獣使いと騎士のみ。',
    tips: [
      'おそらく近年になって生まれた、家族の川渡りとして知られているパズルを改変したものです。',
      '魔獣は、魔獣使いが目を離すと、近くにいる全員を襲います。',
      '騎士は、他国の王女が近くにおり、かつその国の騎士が近くにいない場合、王女を襲います。'
    ],
  },
  passing: 9,
  recommended: true,
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
      rower: true
    }
  }, {
    id: 1,
    name: '魔獣',
    description: '魔獣使いが目を離すと近くにいる全員を襲う。',
    appearance: 'therianthropy1',
    role: {
      rower: false
    }
  }, {
    id: 2,
    name: '青国騎士',
    description: '赤国騎士が目を離すと赤国王女を襲う。',
    appearance: 'knight1',
    role: {
      rower: true,
      predators: [{
        predator: 1,
        guardian: 0,
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
      }]
    }
  }, {
    id: 4,
    name: '赤国騎士',
    description: '青国騎士が目を離すと青国王女を襲う。',
    appearance: 'knight2',
    role: {
      rower: true,
      predators: [{
        predator: 1,
        guardian: 0,
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
      }]
    }
  }]
})
export default scene

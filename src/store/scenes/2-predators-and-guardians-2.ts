import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 16,
  title: '一触即発パーティ（初級編2）',
  level: 2,
  category: 'predators-and-guardians',
  rules: {
    conditions: [
      '登場人物をそれぞれの天敵から保護しつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。ただし筏（いかだ）を漕（こ）げるのは魔獣使いのみ。',
    tips: [
      '戦士は、魔獣使いが目を離すと、近くにいる魔獣を襲います。',
      'また魔獣は、魔獣使いが目を離すと、近くにいる村人を襲います。',
      '古くから「wolf, goat and cabbage problem」（オオカミとヤギとキャベツ）の名で知られる川渡りパズルを改変したものです。',
    ],
  },
  passing: 7,
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
    },
  }, {
    id: 1,
    name: '戦士',
    description: '魔獣使いが目を離すと魔獣を討伐しようとする。',
    appearance: 'fighter1',
    role: {
      rower: false
    },
  }, {
    id: 2,
    name: '魔獣',
    description: '魔獣使いが目を離すと村人を襲う。',
    appearance: 'therianthropy1',
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0
      }]
    }
  }, {
    id: 3,
    name: '村人',
    appearance: 'villager1',
    role: {
      rower: false,
      predators: [{
        predator: 2,
        guardian: 0
      }]
    }
  }]
})
export default scene

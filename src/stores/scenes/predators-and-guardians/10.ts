import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 16,
  title: 'オオカミとヤギとキャベツ',
  category: 30,
  order: 10,
  rules: {
    conditions: [
      '登場人物をそれぞれの天敵から保護しつつ、すべての登場人物を対岸に渡す',
    ],
    transportation: '筏（いかだ）を漕（こ）げるのは農夫のみ。',
    tips: [
      '古くから「wolf, goat and cabbage problem」（オオカミとヤギとキャベツ）の名で知られる川渡りパズルです。',
      'オオカミは、農夫が目を離すと、近くにいるヤギを食べようとします。',
      'またヤギは、農夫が目を離すと、近くにいるキャベツを食べようとします。',
    ],
  },
  passing: 7,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: 'raft2'
  }],
  crews: [{
    id: 0,
    name: '農夫',
    appearance: 'farmer1',
    role: {
      rower: true
    },
  }, {
    id: 1,
    name: 'オオカミ',
    description: '農夫が目を離すとヤギを食べる。',
    appearance: 'lycanthropy1',
    role: {
      rower: false
    },
  }, {
    id: 2,
    name: 'ヤギ',
    description: '農夫が目を離すとキャベツを食べる。',
    appearance: 'goat1',
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0
      }]
    }
  }, {
    id: 3,
    name: 'キャベツ',
    appearance: 'cabbage1',
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

import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 15,
  title: '魔獣使いは苦労が絶えない(2)',
  category: 30,
  order: 2,
  rules: {
    conditions: [
      '村人を魔獣から保護しつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。ただし筏（いかだ）を漕（こ）げるのは魔獣使いのみ。',
    tips: [
      '魔獣は、魔獣使いが目を離すと、近くにいる村人たちを襲います。',
      '古くから「虎の子渡し」の名で知られる川渡りパズルを改変したものです。',
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
    }
  }, {
    id: 1,
    name: '魔獣',
    description: '魔獣使いが目を離すと村人を襲う。',
    appearance: 'therianthropy1',
    role: {
      rower: false
    }
  }, {
    id: 2,
    name: '村人a',
    appearance: 'villager1',
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0,
      }]
    }
  }, {
    id: 3,
    name: '村人b',
    appearance: 'villager2',
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0,
      }]
    }
  }]
})
export default scene

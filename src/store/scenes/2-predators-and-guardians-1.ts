import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 15,
  title: '一触即発パーティ（初級編1）',
  level: 2,
  category: 'predators-and-guardians',
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
    appearance: {
      sprite: 'raft2'
    }
  }],
  casts: [{
    id: 0,
    name: '魔獣使い',
    appearance: {
      sprite: 'beasttamer1'
    },
    role: {
      rower: true
    }
  }, {
    id: 1,
    name: '村人a',
    appearance: {
      sprite: 'villager1'
    },
    role: {
      rower: false,
      predators: [{
        predator: 3,
        guardian: 0,
      }]
    }
  }, {
    id: 2,
    name: '村人b',
    appearance: {
      sprite: 'villager2'
    },
    role: {
      rower: false,
      predators: [{
        predator: 3,
        guardian: 0,
      }]
    }
  }, {
    id: 3,
    name: '魔獣',
    description: '魔獣使いが目を離すと村人を襲う。',
    appearance: {
      sprite: 'therianthropy1'
    },
    role: {
      rower: false
    }
  }]
})
export default scene

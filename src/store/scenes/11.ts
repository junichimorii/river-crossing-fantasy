import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 11,
  title: '一触即発パーティ（初級編2）',
  description: {
    conditions: '登場人物を敵から保護しつつ、すべての登場人物を最小回数で対岸に渡す',
    transportation: '2人乗りの<ruby>筏<rt>いかだ</rt></ruby>が1<ruby>艘<rt>そう</rt></ruby>。ただし<ruby>筏<rt>いかだ</rt></ruby>を<ruby>漕<rt>こ</rt></ruby>げるのは魔獣使いのみ。',
    tips: [
      '古くから「wolf, goat and cabbage problem」（オオカミとヤギとキャベツ）の名で知られる川渡りパズルを改変したもの。',
    ],
  },
  category: 'predators-and-guardians',
  level: 2,
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
    },
  }, {
    id: 1,
    name: '騎士',
    description: '魔獣使いが目を離すと魔獣を討伐しようとする。',
    appearance: {
      sprite: 'knight11',
      ratio: 0.85
    },
    role: {
      rower: false
    },
  }, {
    id: 2,
    name: '魔獣',
    description: '魔獣使いが目を離すと村人を襲う。',
    appearance: {
      sprite: 'therianthropy1',
      ratio: 0.85
    },
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
    appearance: {
      sprite: 'villager1',
      ratio: 0.85
    },
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

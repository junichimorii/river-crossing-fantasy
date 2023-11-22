import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 11,
  title: '一触即発パーティ（初級編2）',
  rules: {
    conditions: [
      '登場人物を敵から保護しつつ、すべての登場人物を対岸に渡す',
      '7回以内にクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。ただし筏（いかだ）を漕（こ）げるのは魔獣使いのみ。',
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
    rules: '魔獣使いが目を離すと魔獣を討伐しようとする。',
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
    rules: '魔獣使いが目を離すと村人を襲う。',
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

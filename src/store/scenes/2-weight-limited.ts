import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 11,
  title: '重量制限（初級編）',
  level: 2,
  category: 'weight-limited',
  rules: {
    conditions: [
      'すべての登場人物を対岸に渡す',
      '9回以内にクリアする'
    ],
    transportation: '2人まで乗れる筏（いかだ）が1艘（そう）あるが、積載（せきさい）重量に制限がある。すべての登場人物が筏（いかだ）を漕（こ）げる。',
    tips: [
      '筏（いかだ）に重量制限のあるパズルです。',
    ],
  },
  passing: 9,
  carriers: [{
    id: 0,
    capacity: 2,
    weightLimit: 1,
    appearance: {
      sprite: 'raft2'
    }
  }],
  casts: [{
    id: 0,
    name: '騎士A',
    appearance: {
      sprite: 'knight31',
    },
    role: {
      weight: 1,
    },
  }, {
    id: 1,
    name: '騎士B',
    appearance: {
      sprite: 'knight32'
    },
    role: {
      weight: 1
    }
  }, {
    id: 2,
    name: '村人A',
    appearance: {
      sprite: 'villager1'
    },
    role: {
      weight: 0.5
    }
  }, {
    id: 3,
    name: '村人B',
    appearance: {
      sprite: 'villager2'
    },
    role: {
      weight: 0.5
    }
  }]
})
export default scene

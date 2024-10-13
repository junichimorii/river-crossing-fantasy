import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 64,
  title: 'ポーターは荷物が多い(4)',
  category: 6,
  order: 4,
  rules: {
    conditions: [
      '重量制限に注意しながら、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗り、重量制限2.0人分の筏（いかだ）が1艘（そう）。すべての登場人物が筏（いかだ）を漕（こ）げる。',
    tips: [
      '登場人物の重量には**ばらつき**があります。最も重いポーターは1.5人分、最も軽い盗賊は0.7人分です。',
    ],
  },
  passing: 17,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: 'raft2'
  }],
  casts: [{
    id: 0,
    name: 'ポーターA',
    appearance: 'porter1',
    role: {
      rower: true,
      weight: 1.5
    }
  }, {
    id: 1,
    name: 'ポーターB',
    appearance: 'porter2',
    role: {
      rower: true,
      weight: 1.5
    }
  }, {
    id: 2,
    name: '戦士',
    appearance: 'fighter1',
    role: {
      rower: true,
      weight: 1.3
    }
  }, {
    id: 3,
    name: '司祭',
    appearance: 'priest1',
    role: {
      rower: true,
      weight: 1.1
    }
  }, {
    id: 4,
    name: '村人',
    appearance: 'villager1',
    role: {
      rower: true,
      weight: 1
    }
  }, {
    id: 5,
    name: '魔法使い',
    appearance: 'mage1',
    role: {
      rower: true,
      weight: 0.9,
    },
  }, {
    id: 6,
    name: '王女',
    appearance: 'princess11',
    role: {
      rower: true,
      weight: 0.8,
    }
  }, {
    id: 7,
    name: '盗賊',
    appearance: 'thief1',
    role: {
      rower: true,
      weight: 0.7,
    },
  }]
})
export default scene
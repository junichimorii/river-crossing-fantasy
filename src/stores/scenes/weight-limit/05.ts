import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 64,
  title: 'ポーターは荷物が多い(5)',
  category: 70,
  order: 5,
  rules: {
    conditions: [
      '重量制限に注意しながら、すべての登場人物を対岸に渡す',
    ],
    transportation: '王女のみ筏（いかだ）を漕（こ）げない。',
    tips: [
      '登場人物の重量はそれぞれ異なります。最も重いポーターは1.8人分、最も軽い王女は0.4人分です。',
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
      weight: 1.8
    }
  }, {
    id: 1,
    name: 'ポーターB',
    appearance: 'porter2',
    role: {
      rower: true,
      weight: 1.8
    }
  }, {
    id: 2,
    name: '戦士',
    appearance: 'fighter1',
    role: {
      rower: true,
      weight: 1.6
    }
  }, {
    id: 3,
    name: '司祭',
    appearance: 'priest1',
    role: {
      rower: true,
      weight: 1.2
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
    appearance: 'wizard1',
    role: {
      rower: true,
      weight: 0.8,
    },
  }, {
    id: 6,
    name: '盗賊',
    appearance: 'thief1',
    role: {
      rower: true,
      weight: 0.6,
    }
  }, {
    id: 7,
    name: '王女',
    appearance: 'princess11',
    role: {
      rower: false,
      weight: 0.4,
    },
  }]
})
export default scene

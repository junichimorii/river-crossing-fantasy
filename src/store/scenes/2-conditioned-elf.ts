import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 12,
  title: 'エルフは人間がお嫌い（初級編）',
  level: 2,
  category: 'conditioned',
  rules: {
    conditions: [
      'エルフと人間が筏（いかだ）に同乗しないよう気を遣いつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。すべての登場人物が筏（いかだ）を漕（こ）げる。',
    tips: [
      'エルフと人間が筏（いかだ）に同乗しないよう気を遣いつつ川を渡るパズルです。',
    ],
  },
  passing: 9,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: {
      sprite: 'raft2'
    }
  }],
  casts: [{
    id: 0,
    name: '村人A',
    appearance: {
      sprite: 'villager1'
    },
    role: {
      rower: true
    }
  }, {
    id: 1,
    name: '村人B',
    appearance: {
      sprite: 'villager2'
    },
    role: {
      rower: true
    }
  }, {
    id: 2,
    name: '村人C',
    appearance: {
      sprite: 'villager3'
    },
    role: {
      rower: true
    }
  }, {
    id: 3,
    name: 'エルフA',
    description: '人間と一緒に筏（いかだ）に乗ることを嫌う。',
    appearance: {
      sprite: 'elf1',
    },
    role: {
      rower: true,
      aversions: [0, 1, 2]
    }
  }, {
    id: 4,
    name: 'エルフB',
    description: '人間と一緒に筏（いかだ）に乗ることを嫌う。',
    appearance: {
      sprite: 'elf2',
    },
    role: {
      rower: true,
      aversions: [0, 1, 2]
    }
  }, {
    id: 5,
    name: 'エルフC',
    description: '人間と一緒に筏（いかだ）に乗ることを嫌う。',
    appearance: {
      sprite: 'elf3',
    },
    role: {
      rower: true,
      aversions: [0, 1, 2]
    }
  }]
})
export default scene

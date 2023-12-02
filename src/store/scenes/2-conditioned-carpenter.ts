import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 14,
  title: '定期点検を忘れずに（初級編）',
  level: 2,
  category: 'conditioned',
  rules: {
    conditions: [
      '筏（いかだ）が故障しないよう修理しつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）あるが、1回乗る度に修理が必要。すべての登場人物が筏（いかだ）を漕（こ）げる。',
    tips: [
      '筏（いかだ）を修理しつつ川を渡るパズルです。',
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
      rower: true,
    }
  }, {
    id: 1,
    name: '村人B',
    appearance: {
      sprite: 'villager2'
    },
    role: {
      rower: true,
    }
  }, {
    id: 2,
    name: '村人C',
    appearance: {
      sprite: 'villager3'
    },
    role: {
      rower: true,
    }
  }, {
    id: 3,
    name: '大工a',
    appearance: {
      sprite: 'carpenter1'
    },
    role: {
      rower: false,
      repairer: true
    }
  }, {
    id: 4,
    name: '大工b',
    appearance: {
      sprite: 'carpenter2'
    },
    role: {
      rower: false,
      repairer: true
    }
  }, {
    id: 5,
    name: '大工c',
    appearance: {
      sprite: 'carpenter3'
    },
    role: {
      rower: false,
      repairer: true
    }
  }]
})
export default scene

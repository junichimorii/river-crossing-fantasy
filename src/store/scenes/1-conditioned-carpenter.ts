import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 6,
  title: '定期点検を忘れずに（入門編）',
  level: 1,
  category: 'conditioned',
  rules: {
    conditions: [
      '筏（いかだ）が故障しないよう修理しつつ、すべての登場人物を対岸に渡す',
      '3回以内にクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）あるが、1回乗る度に修理が必要。すべての登場人物が筏（いかだ）を漕（こ）げる。',
    tips: [
      '今回登場する筏（いかだ）は、<b>1回乗る度に修理しないと壊れてしまいます</b>。',
      '筏（いかだ）と同じ岸に大工がいないと、筏（いかだ）を修理することができません。',
      '岸への到着時、筏（いかだ）を修理できない場合は<b>その時点でクリア失敗</b>となります。',
    ],
  },
  passing: 3,
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
    name: '大工',
    appearance: {
      sprite: 'carpenter1'
    },
    role: {
      rower: true,
      repairer: true
    }
  }]
})
export default scene

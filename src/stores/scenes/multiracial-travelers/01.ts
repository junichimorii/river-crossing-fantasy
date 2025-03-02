import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 6,
  title: '定期点検を忘れずに(1)',
  category: 15,
  order: 1,
  rules: {
    conditions: [
      '筏（いかだ）が故障しないよう修理しつつ、すべての登場人物を対岸に渡す',
      '3回以内にクリアする'
    ],
    tips: [
      '今回登場する筏（いかだ）は、**1回乗る度に修理しないと壊れてしまいます**。',
      '筏（いかだ）と同じ岸に大工がいないと、筏（いかだ）を修理することができません。',
      '岸への到着時、筏（いかだ）を修理できない場合は**その時点でクリア失敗**となります。',
    ],
  },
  passing: 3,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: 'raft2'
  }],
  crews: [{
    id: 0,
    name: '村人A',
    appearance: 'villager1',
    role: {
      rower: true
    }
  }, {
    id: 1,
    name: '村人B',
    appearance: 'villager2',
    role: {
      rower: true
    }
  }, {
    id: 2,
    name: '大工',
    appearance: 'carpenter1',
    role: {
      rower: true,
      repairer: true
    }
  }]
})
export default scene

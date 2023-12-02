import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 9,
  title: '吟遊詩人は孤独がお嫌い（入門編）',
  level: 1,
  category: 'conditioned',
  rules: {
    conditions: [
      '吟遊詩人が独りぼっちにならないよう気を遣いつつ、すべての登場人物を対岸に渡す',
      '5回以内にクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。すべての登場人物が筏（いかだ）を漕（こ）げる。',
    tips: [
      '今回登場する吟遊詩人は、両岸でも筏（いかだ）の上でも、独りぼっちになることを嫌います。',
      '吟遊詩人が不安な状態の時は、感情を表すマークが表示されます。その状態で筏（いかだ）を移動させることはできません。',
    ],
  },
  passing: 5,
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
    name: '吟遊詩人',
    description: '独りぼっちを嫌う。',
    appearance: {
      sprite: 'bard1',
    },
    role: {
      rower: true,
      monophobia: true
    }
  }]
})
export default scene

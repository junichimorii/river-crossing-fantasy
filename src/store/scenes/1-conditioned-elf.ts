import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 7,
  title: 'エルフは人間がお嫌い（入門編）',
  level: 1,
  category: 'conditioned',
  rules: {
    conditions: [
      'エルフと人間が筏（いかだ）に同乗しないよう気を遣いつつ、すべての登場人物を対岸に渡す',
      '5回以内にクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。すべての登場人物が筏（いかだ）を漕（こ）げる。',
    tips: [
      '今回登場するエルフは、<b>人間と一緒に筏（いかだ）に乗ることを嫌います</b>。',
      'エルフが不快な状態の時は、感情を表すマークが表示されます。その状態で筏（いかだ）を移動させることはできません。',
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
    name: 'エルフ',
    description: '人間と一緒に筏（いかだ）に乗ることを嫌う。',
    appearance: {
      sprite: 'elf1',
    },
    role: {
      rower: true,
      aversions: [0, 1]
    }
  }]
})
export default scene

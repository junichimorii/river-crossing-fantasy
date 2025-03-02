import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 7,
  title: 'エルフは人間がお嫌い(1)',
  category: 15,
  order: 2,
  rules: {
    conditions: [
      'エルフと人間が筏（いかだ）に同乗しないよう気を遣いつつ、すべての登場人物を対岸に渡す',
      '5回以内にクリアする'
    ],
    tips: [
      '今回登場するエルフは、**人間と一緒に筏（いかだ）に乗ることを嫌います**。',
      'エルフが不快な状態の時は、感情を表すマークが表示されます。その状態で筏（いかだ）を移動させることはできません。',
    ],
  },
  passing: 5,
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
    name: 'エルフ',
    appearance: 'elf1',
    role: {
      rower: true,
      demihuman: true,
      misanthrope: true
    }
  }]
})
export default scene

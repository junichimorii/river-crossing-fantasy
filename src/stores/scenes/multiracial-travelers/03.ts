import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 9,
  title: '道化師は自由を求める(1)',
  category: 15,
  order: 3,
  rules: {
    conditions: [
      '道化師が単独行動しないよう気を遣いつつ、すべての登場人物を対岸に渡す',
      '5回以内にクリアする'
    ],
    tips: [
      '今回登場する道化師は、いずれかの場所で**ひとりになると**逃走を企てます。',
      '道化師が単独行動可能な状態の時は、感情を表すマークが表示されます。その状態で筏（いかだ）を移動させることはできません。',
    ],
  },
  passing: 5,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: 'raft2'
  }],
  casts: [{
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
    name: '村人C',
    appearance: 'villager3',
    role: {
      rower: true
    }
  }, {
    id: 3,
    name: '道化師',
    appearance: 'clown1',
    role: {
      rower: true,
      freespirited: true
    }
  }]
})
export default scene

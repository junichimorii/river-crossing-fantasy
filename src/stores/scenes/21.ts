import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 4,
  title: '魔獣使いは苦労が絶えない(1)',
  category: 2,
  order: 1,
  level: 1,
  rules: {
    conditions: [
      '村人を魔獣から保護しつつ、すべての登場人物を対岸に渡す',
      '3回以内にクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。ただし筏（いかだ）を漕（こ）げるのは魔獣使いのみ。',
    tips: [
      '登場人物には、<b>苦手とする天敵</b>、および<b>その天敵から守ってくれる保護者</b>がいます。今回のケースでは、魔獣が村人の天敵、魔獣使いが村人の保護者です。',
      'ある登場人物が天敵と同じ場所にいる時は、保護者も必ず同じ場所にいる必要があります。',
      'ある登場人物が危険な状態の時は、その関係者に感情を表すマークが表示されます。その状態で筏（いかだ）を移動させることはできません。',
    ],
  },
  passing: 3,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: 'raft2'
  }],
  casts: [{
    id: 0,
    name: '魔獣使い',
    appearance: 'beasttamer1',
    role: {
      rower: true
    }
  }, {
    id: 1,
    name: '魔獣',
    description: '魔獣使いが目を離すと村人を襲う。',
    appearance: 'therianthropy1',
    role: {
      rower: false
    }
  }, {
    id: 2,
    name: '村人',
    appearance: 'villager1',
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0,
      }]
    }
  }]
})
export default scene

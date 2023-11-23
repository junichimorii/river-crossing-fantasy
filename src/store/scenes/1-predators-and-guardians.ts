import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 6,
  title: '一触即発パーティ（入門編）',
  level: 1,
  category: 'predators-and-guardians',
  rules: {
    conditions: [
      '村人を魔獣から保護しつつ、すべての登場人物を対岸に渡す',
      '3回以内にクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。ただし筏（いかだ）を漕（こ）げるのは魔獣使いのみ。',
    tips: [
      '登場人物には、苦手とする天敵、およびその天敵から守ってくれる保護者がいます。今回のケースでは、魔獣が村人の天敵、魔獣使いが村人の保護者です。',
      'ある登場人物が天敵と同じ場所にいる時は、保護者も必ず同じ場所にいる必要があります。',
      'ある登場人物が危険な状態の時は、その登場人物・天敵・保護者に感情を表すマークが表示されます。その状態で筏（いかだ）を移動させることはできません。',
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
    name: '魔獣使い',
    appearance: {
      sprite: 'beasttamer1'
    },
    role: {
      rower: true,
    }
  }, {
    id: 1,
    name: '村人',
    appearance: {
      sprite: 'villager1',
      ratio: 0.85
    },
    role: {
      rower: false,
      predators: [{
        predator: 2,
        guardian: 0,
      }],
    }
  }, {
    id: 2,
    name: '魔獣',
    description: '魔獣使いが目を離すと村人を襲う。',
    appearance: {
      sprite: 'therianthropy1',
      ratio: 0.85
    },
    role: {
      rower: false,
    }
  }]
})
export default scene

import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 5,
  title: '危険なパーティ（入門編）',
  description: {
    conditions: '村人を魔獣から保護しつつ、すべての登場人物を最小回数で対岸に渡す',
    transportation: '2人乗りの舟が1<ruby>艘<rt>そう</rt></ruby>。ただし舟を<ruby>漕<rt>こ</rt></ruby>げるのは魔獣使いのみ。',
    tips: [
      '登場人物には、苦手とする敵、およびその敵から守ってくれる保護者がいます。',
      'ある登場人物が敵と同じ場所にいる時は、保護者も必ず同じ場所にいる必要があります。',
      'ある登場人物が危機に<ruby>瀕<rt>ひん</rt></ruby>している時は、その登場人物・敵・保護者に感情を表すマークが表示されます。その状態で舟を移動させることはできません。',
    ],
  },
  category: 'predators-and-guardians',
  level: 1,
  passing: 3,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: {
      sprite: '/images/carriers/boat2.png'
    }
  }],
  casts: [{
    id: 0,
    name: '魔獣使い',
    appearance: {
      sprite: '/images/casts/beast-tamer1.png'
    },
    role: {
      rower: true,
    }
  }, {
    id: 1,
    name: '村人',
    appearance: {
      sprite: '/images/casts/villager1.png',
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
      sprite: '/images/casts/therianthropy1.png',
      ratio: 0.85
    },
    role: {
      rower: false,
    }
  }]
})
export default scene

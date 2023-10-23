import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 6,
  title: '危険なパーティ（初級編1）',
  description: {
    conditions: '村人を魔獣から保護しつつ、すべてのキャラクターを最小回数で対岸に渡す',
    transportation: '2人乗りの舟が1艘。ただし舟を漕げるのは魔獣使いのみ。',
  },
  tips: [
    'キャラクターには、苦手とする敵、およびその敵から守ってくれる保護者がいます。',
    'あるキャラクターが敵と同じ場所にいる時は、保護者も必ず同じ場所にいる必要があります。',
    'あるキャラクターが危機に瀕している時は、そのキャラクター・敵・保護者に感情を表すマークが表示されます。',
    'いずれかのキャラクターが危機に瀕している状況で舟を移動させることはできません。',
  ],
  category: 'enemies-and-guardians',
  passing: 7,
  landscape: '/images/landscapes/daytime-river.png',
  carriers: [{
    id: 0,
    appearance: '/images/carriers/boat2.png',
    capacity: 2,
  }],
  casts: [{
    id: 0,
    avatar: '/images/casts/beast-tamer1.png',
    name: '魔獣使い',
    role: {
      canRow: true,
    },
  }, {
    id: 1,
    avatar: '/images/casts/villager1.png',
    name: '村人',
    ratio: 0.85,
    role: {
      canRow: false,
      predators: [{
        predator: 2,
        guardian: 0,
      }],
      guardian: 0,
    },
  }, {
    id: 2,
    avatar: '/images/casts/therianthropy1.png',
    name: '魔獣',
    description: '魔獣使いが目を離すと村人を襲う。',
    ratio: 0.85,
    role: {
      canRow: false,
    },
  }],
}) as Scene
export default scene

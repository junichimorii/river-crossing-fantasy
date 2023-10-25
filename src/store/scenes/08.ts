import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 8,
  title: '防衛戦線（初級編）',
  description: {
    conditions: '王女を他国の騎士から保護しつつ、すべてのキャラクターを最小回数で対岸に渡す',
    transportation: '2人乗りの舟が1艘。すべてのキャラクターが舟を漕げる。',
  },
  tips: [
    '騎士達が同国の王女を保護しながら川を渡るパズルです。',
    '王女は、同国の騎士が近くにいない場合、他国の騎士に襲われてしまいます。',
    'いずれかのキャラクターが危機に瀕している状況で舟を移動させることはできません。',
  ],
  category: 'escorting-celebrity',
  passing: 5,
  landscape: '/images/landscapes/daytime-river.png',
  carriers: [{
    id: 0,
    appearance: '/images/carriers/boat2.png',
    capacity: 2,
  }],
  casts: [{
    id: 0,
    avatar: '/images/casts/knight-a1.png',
    name: 'A国騎士',
    description: '他国の騎士が目を離すと他国の王女を襲う。',
    role: {
    },
  }, {
    id: 1,
    avatar: '/images/casts/princess-a1.png',
    name: 'A国王女',
    description: '同国の騎士が近くにいないと他国の騎士に襲われる。',
    role: {
      predators: [{
        predator: 2,
        guardian: 0,
      }],
    },
  }, {
    id: 2,
    avatar: '/images/casts/knight-b1.png',
    name: 'B国騎士',
    description: '他国の騎士が目を離すと他国の王女を襲う。',
    role: {
    },
  }, {
    id: 3,
    avatar: '/images/casts/princess-b1.png',
    name: 'B国王女',
    description: '同国の騎士が近くにいないと他国の騎士に襲われる。',
    role: {
      predators: [{
        predator: 0,
        guardian: 2,
      }],
    },
  }],
}) as Scene
export default scene

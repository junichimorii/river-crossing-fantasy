import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 13,
  title: '防衛戦線（中級編）',
  description: {
    conditions: '王女を他国の騎士から保護しつつ、すべてのキャラクターを最小回数で対岸に渡す',
    transportation: '2人乗りの舟が1艘。すべてのキャラクターが舟を漕げる。',
  },
  tips: [
    '古くから「jealous husbands problem」（嫉妬深い夫の問題）の名で知られる川渡りパズルを改変したもの。',
  ],
  category: 'escorting-celebrity',
  passing: 11,
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
      }, {
        predator: 4,
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
      }, {
        predator: 4,
        guardian: 2,
      }],
    },
  }, {
    id: 4,
    avatar: '/images/casts/knight-c1.png',
    name: 'C国騎士',
    description: '他国の騎士が目を離すと他国の王女を襲う。',
    role: {
    },
  }, {
    id: 5,
    avatar: '/images/casts/princess-c1.png',
    name: 'C国王女',
    description: '同国の騎士が近くにいないと他国の騎士に襲われる。',
    role: {
      predators: [{
        predator: 0,
        guardian: 4,
      }, {
        predator: 2,
        guardian: 4,
      }],
    },
  }],
}) as Scene
export default scene

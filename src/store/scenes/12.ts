import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 12,
  title: '魔獣と魔獣使い(3)',
  description: {
    conditions: 'すべてのキャラクターが危機に瀕することなく最小回数で対岸に渡る',
    transportation: '2人乗りの舟が1艘。すべてのキャラクターが舟を漕げる。',
  },
  tips: [
    '古くから「jealous husbands problem」（嫉妬深い夫の問題）の名で知られる川渡りパズル。',
  ],
  category: 'enemies-and-guardians',
  passing: 11,
  landscape: '/images/landscapes/daytime-river.png',
  carriers: [{
    id: 0,
    appearance: '/images/carriers/boat2.png',
    capacity: 2,
  }],
  casts: [{
    id: 0,
    avatar: '/images/casts/beast-tamer1.png',
    name: '魔獣使いA',
    description: 'ペアとなる魔獣が近くにいないと他の魔獣に襲われる。',
    role: {
      enemies: [3, 5],
      guardian: 1,
    },
  }, {
    id: 1,
    avatar: '/images/casts/therianthropy1.png',
    name: '魔獣A',
    role: {
    },
  }, {
    id: 2,
    avatar: '/images/casts/beast-tamer2.png',
    name: '魔獣使いB',
    description: 'ペアとなる魔獣が近くにいないと他の魔獣に襲われる。',
    role: {
      enemies: [1, 5],
      guardian: 3,
    },
  }, {
    id: 3,
    avatar: '/images/casts/therianthropy2.png',
    name: '魔獣B',
    role: {
    },
  }, {
    id: 4,
    avatar: '/images/casts/beast-tamer3.png',
    name: '魔獣使いC',
    description: 'ペアとなる魔獣が近くにいないと他の魔獣に襲われる。',
    role: {
      enemies: [1, 3],
      guardian: 5,
    },
  }, {
    id: 5,
    avatar: '/images/casts/therianthropy3.png',
    name: '魔獣C',
    role: {
    },
  }],
}) as Scene
export default scene

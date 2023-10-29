import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 18,
  title: '魔獣使いの苦悩（中級編2）',
  description: {
    conditions: '両岸で魔獣使い側が半数以上を維持しつつ、すべてのキャラクターを最小回数で対岸に渡す',
    transportation: '2人乗りの舟が1艘。ただし舟を漕げるのは魔獣使いAと魔獣Aのみ。',
  },
  category: 'keep-majority',
  landscape: '/images/landscapes/daytime-river.png',
  passing: 11,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: {
      sprite: '/images/carriers/boat2.png'
    }
  }],
  casts: [{
    id: 0,
    name: '魔獣使いA',
    appearance: {
      sprite: '/images/casts/beast-tamer1.png'
    },
    role: {
      canRow: true,
      rebel: false
    }
  }, {
    id: 1,
    name: '魔獣使いB',
    appearance: {
      sprite: '/images/casts/beast-tamer2.png',
      ratio: 0.85
    },
    role: {
      canRow: false,
      rebel: false
    }
  }, {
    id: 2,
    name: '魔獣使いC',
    appearance: {
      sprite: '/images/casts/beast-tamer3.png',
      ratio: 0.85
    },
    role: {
      canRow: false,
      rebel: false
    }
  }, {
    id: 3,
    name: '魔獣A',
    appearance: {
      sprite: '/images/casts/therianthropy1.png'
    },
    role: {
      canRow: true,
      rebel: true
    }
  }, {
    id: 4,
    name: '魔獣B',
    appearance: {
      sprite: '/images/casts/therianthropy2.png',
      ratio: 0.85
    },
    role: {
      canRow: false,
      rebel: true
    }
  }, {
    id: 5,
    name: '魔獣C',
    appearance: {
      sprite: '/images/casts/therianthropy3.png',
      ratio: 0.85
    },
    role: {
      canRow: false,
      rebel: true
    }
  }]
}) as Scene
export default scene

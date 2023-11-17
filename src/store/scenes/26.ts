import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 26,
  title: '魔獣たちの反乱（上級編）',
  description: {
    conditions: '両岸および舟の上で魔獣使い側が半数以上を維持しつつ、すべての登場人物を最小回数で対岸に渡す',
    transportation: '2人乗りの舟が1<ruby>艘<rt>そう</rt></ruby>。すべての登場人物が舟を<ruby>漕<rt>こ</rt></ruby>げる。',
  },
  category: 'keep-majority',
  landscape: {
    island: true
  },
  level: 4,
  passing: 26,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: {
      sprite: '/images/carriers/boat3.png'
    }
  }],
  casts: [{
    id: 0,
    name: '魔獣使いA',
    appearance: {
      sprite: '/images/casts/beast-tamer1.png'
    },
    role: {
      rebel: false
    }
  }, {
    id: 1,
    name: '魔獣使いB',
    appearance: {
      sprite: '/images/casts/beast-tamer2.png'
    },
    role: {
      rebel: false
    }
  }, {
    id: 2,
    name: '魔獣使いC',
    appearance: {
      sprite: '/images/casts/beast-tamer3.png'
    },
    role: {
      rebel: false
    }
  }, {
    id: 3,
    name: '魔獣使いD',
    appearance: {
      sprite: '/images/casts/beast-tamer4.png'
    },
    role: {
      rebel: false
    }
  }, {
    id: 4,
    name: '魔獣A',
    appearance: {
      sprite: '/images/casts/therianthropy1.png'
    },
    role: {
      rebel: true
    }
  }, {
    id: 5,
    name: '魔獣B',
    appearance: {
      sprite: '/images/casts/therianthropy2.png'
    },
    role: {
      rebel: true
    }
  }, {
    id: 6,
    name: '魔獣C',
    appearance: {
      sprite: '/images/casts/therianthropy3.png'
    },
    role: {
      rebel: true
    }
  }, {
    id: 7,
    name: '魔獣D',
    appearance: {
      sprite: '/images/casts/therianthropy4.png'
    },
    role: {
      rebel: true
    }
  }]
})
export default scene

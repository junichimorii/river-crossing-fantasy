import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 24,
  title: '魔獣たちの反乱（最上級編）',
  description: {
    conditions: '両岸および舟の上で魔獣使い側が半数以上を維持しつつ、すべての登場人物を最小回数で対岸に渡す',
    transportation: '2人乗りの舟が1<ruby>艘<rt>そう</rt></ruby>。すべての登場人物が舟を<ruby>漕<rt>こ</rt></ruby>げる。',
  },
  category: 'keep-majority',
  landscape: {
    island: true
  },
  level: 5,
  passing: 26,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: {
      sprite: 'boat2'
    }
  }],
  casts: [{
    id: 0,
    name: '魔獣使いA',
    appearance: {
      sprite: 'beasttamer1'
    },
    role: {
      rebel: false
    }
  }, {
    id: 1,
    name: '魔獣使いB',
    appearance: {
      sprite: 'beasttamer2'
    },
    role: {
      rebel: false
    }
  }, {
    id: 2,
    name: '魔獣使いC',
    appearance: {
      sprite: 'beasttamer3'
    },
    role: {
      rebel: false
    }
  }, {
    id: 3,
    name: '魔獣使いD',
    appearance: {
      sprite: 'beasttamer4'
    },
    role: {
      rebel: false
    }
  }, {
    id: 4,
    name: '魔獣A',
    appearance: {
      sprite: 'therianthropy1'
    },
    role: {
      rebel: true
    }
  }, {
    id: 5,
    name: '魔獣B',
    appearance: {
      sprite: 'therianthropy2'
    },
    role: {
      rebel: true
    }
  }, {
    id: 6,
    name: '魔獣C',
    appearance: {
      sprite: 'therianthropy3'
    },
    role: {
      rebel: true
    }
  }, {
    id: 7,
    name: '魔獣D',
    appearance: {
      sprite: 'therianthropy4'
    },
    role: {
      rebel: true
    }
  }]
})
export default scene

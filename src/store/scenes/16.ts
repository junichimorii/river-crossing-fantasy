import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 16,
  title: '魔獣たちの反乱（中級編2）',
  description: {
    conditions: '両岸で魔獣使い側が半数以上を維持しつつ、すべての登場人物を最小回数で対岸に渡す',
    transportation: '2人乗りの舟が1<ruby>艘<rt>そう</rt></ruby>。ただし舟を<ruby>漕<rt>こ</rt></ruby>げるのは魔獣使いAと魔獣Aのみ。',
  },
  category: 'keep-majority',
  level: 3,
  passing: 13,
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
      rower: true,
      rebel: false
    }
  }, {
    id: 1,
    name: '魔獣使いb',
    appearance: {
      sprite: 'beasttamer2',
      ratio: 0.85
    },
    role: {
      rower: false,
      rebel: false
    }
  }, {
    id: 2,
    name: '魔獣使いc',
    appearance: {
      sprite: 'beasttamer3',
      ratio: 0.85
    },
    role: {
      rower: false,
      rebel: false
    }
  }, {
    id: 3,
    name: '魔獣A',
    appearance: {
      sprite: 'therianthropy1'
    },
    role: {
      rower: true,
      rebel: true
    }
  }, {
    id: 4,
    name: '魔獣b',
    appearance: {
      sprite: 'therianthropy2',
      ratio: 0.85
    },
    role: {
      rower: false,
      rebel: true
    }
  }, {
    id: 5,
    name: '魔獣c',
    appearance: {
      sprite: 'therianthropy3',
      ratio: 0.85
    },
    role: {
      rower: false,
      rebel: true
    }
  }]
})
export default scene

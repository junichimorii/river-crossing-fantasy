import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 22,
  title: '王女親衛隊の攻防（最上級編）',
  description: {
    conditions: '王女を他国の騎士から保護しつつ、すべての登場人物を最小回数で対岸に渡す',
    transportation: '2人乗りの舟が1<ruby>艘<rt>そう</rt></ruby>。すべての登場人物が舟を<ruby>漕<rt>こ</rt></ruby>げる。川の中の島に降りることもできる。',
    tips: [
      '川の中間にある中州に降りることができます。',
      '中州にいる登場人物を右方向にスワイプすると舟に乗り、左方向にスワイプすると舟から降ります。',
      '舟を移動させるボタンが2つ表示されている時は、進行方向を選ぶことができます。',
    ],
  },
  category: 'escorting-celebrity',
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
    name: 'A国騎士',
    description: '他国の騎士が目を離すと他国の王女を襲う。',
    appearance: {
      sprite: 'knight11'
    },
    role: {
    }
  }, {
    id: 1,
    name: 'A国王女',
    appearance: {
      sprite: 'princess11'
    },
    role: {
      predators: [{
        predator: 2,
        guardian: 0
      }, {
        predator: 4,
        guardian: 0
      }, {
        predator: 6,
        guardian: 0
      }]
    }
  }, {
    id: 2,
    name: 'B国騎士',
    description: '他国の騎士が目を離すと他国の王女を襲う。',
    appearance: {
      sprite: 'knight21'
    },
    role: {
    }
  }, {
    id: 3,
    name: 'B国王女',
    appearance: {
      sprite: 'princess21'
    },
    role: {
      predators: [{
        predator: 0,
        guardian: 2
      }, {
        predator: 4,
        guardian: 2
      }, {
        predator: 6,
        guardian: 2
      }]
    }
  }, {
    id: 4,
    name: 'C国騎士',
    description: '他国の騎士が目を離すと他国の王女を襲う。',
    appearance: {
      sprite: 'knight31'
    },
    role: {
    }
  }, {
    id: 5,
    name: 'C国王女',
    appearance: {
      sprite: 'princess31'
    },
    role: {
      predators: [{
        predator: 0,
        guardian: 4
      }, {
        predator: 2,
        guardian: 4
      }, {
        predator: 6,
        guardian: 4
      }]
    }
  }, {
    id: 6,
    name: 'D国騎士',
    description: '他国の騎士が目を離すと他国の王女を襲う。',
    appearance: {
      sprite: 'knight41'
    },
    role: {
    }
  }, {
    id: 7,
    name: 'D国王女',
    appearance: {
      sprite: 'princess41'
    },
    role: {
      predators: [{
        predator: 0,
        guardian: 6
      }, {
        predator: 2,
        guardian: 6
      }, {
        predator: 4,
        guardian: 6
      }]
    }
  }]
})
export default scene

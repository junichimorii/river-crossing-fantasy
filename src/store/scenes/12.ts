import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 12,
  title: '王女親衛隊の攻防（中級編）',
  rules: {
    conditions: [
      '王女を他国の騎士から保護しつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。すべての登場人物が筏（いかだ）を漕（こ）げる。',
    tips: [
      '古くから「jealous husbands problem」（<ruby>嫉妬<rt>しっと</rt></ruby>深い夫の問題）の名で知られる川渡りパズルを改変したもの。',
    ],
  },
  category: 'escorting-celebrity',
  level: 3,
  passing: 11,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: {
      sprite: 'raft2'
    }
  }],
  casts: [{
    id: 0,
    name: 'A国騎士',
    rules: '他国の騎士が目を離すとその国の王女を襲う。',
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
      }]
    }
  }, {
    id: 2,
    name: 'B国騎士',
    rules: '他国の騎士が目を離すとその国の王女を襲う。',
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
      }]
    }
  }, {
    id: 4,
    name: 'C国騎士',
    rules: '他国の騎士が目を離すとその国の王女を襲う。',
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
      }]
    }
  }]
})
export default scene

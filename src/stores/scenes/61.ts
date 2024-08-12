import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 32,
  title: '王女親衛隊の攻防（最上級編）',
  category: 6,
  order: 1,
  level: 5,
  rules: {
    conditions: [
      '王女を他国の騎士から保護しつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。すべての登場人物が筏（いかだ）を漕（こ）げる。川の中の島に降りることもできる。',
    tips: [
      '川の中間にある中州に降りることができます。',
      '中州にいる登場人物を右方向にスワイプすると筏（いかだ）に乗り、左方向にスワイプすると筏（いかだ）から降ります。',
      '筏（いかだ）を移動させるボタンが2つ表示されている時は、進行方向を選ぶことができます。',
    ],
  },
  landscape: {
    island: true
  },
  passing: 26,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: 'raft2'
  }],
  casts: [{
    id: 0,
    name: 'A国騎士',
    description: '他国の騎士が目を離すと他国の王女を襲う。',
    appearance: 'knight11',
    role: {
      rower: true
    }
  }, {
    id: 1,
    name: 'A国王女',
    appearance: 'princess11',
    role: {
      rower: true,
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
    appearance: 'knight21',
    role: {
      rower: true
    }
  }, {
    id: 3,
    name: 'B国王女',
    appearance: 'princess21',
    role: {
      rower: true,
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
    appearance: 'knight31',
    role: {
      rower: true
    }
  }, {
    id: 5,
    name: 'C国王女',
    appearance: 'princess31',
    role: {
      rower: true,
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
    appearance: 'knight41',
    role: {
      rower: true
    }
  }, {
    id: 7,
    name: 'D国王女',
    appearance: 'princess41',
    role: {
      rower: true,
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

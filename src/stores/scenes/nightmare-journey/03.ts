import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 70,
  title: '絶体絶命パーティ(3)',
  category: 9,
  order: 3,
  rules: {
    conditions: [
      '登場人物をそれぞれの天敵から保護しつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。ただし筏（いかだ）を漕（こ）げるのは魔獣使い、死霊使い、竜使い、騎士のみ。',
    tips: [
      '魔獣は、魔獣使いが目を離すと、近くにいる死霊と竜人以外の全員を襲います。',
      '死霊は、死霊使いが目を離すと、近くにいる魔獣と竜人以外の全員を襲います。',
      '竜人は、竜使いが目を離すと、近くにいる魔獣と死霊以外の全員を襲います。',
      '騎士は、他国の王女が近くにおり、かつその国の騎士が近くにいない場合、王女を襲います。'
    ],
  },
  passing: 17,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: 'raft2'
  }],
  casts: [{
    id: 0,
    name: '魔獣使い',
    appearance: 'beasttamer1',
    role: {
      rower: true,
      predators: [{
        predator: 3,
        guardian: 2,
      }, {
        predator: 5,
        guardian: 4,
      }]
    }
  }, {
    id: 1,
    name: '魔獣',
    description: '魔獣使いが目を離すと死霊使いと竜使いを襲う。',
    appearance: 'therianthropy1',
    role: {
      rower: false
    }
  }, {
    id: 2,
    name: '死霊使い',
    appearance: 'necromancer1',
    role: {
      rower: true,
      predators: [{
        predator: 1,
        guardian: 0,
      }, {
        predator: 5,
        guardian: 4,
      }]
    }
  }, {
    id: 3,
    name: '死霊',
    description: '死霊使いが目を離すと魔獣使いと竜使いを襲う。',
    appearance: 'undead1',
    role: {
      rower: false
    }
  }, {
    id: 4,
    name: '竜使い',
    appearance: 'dragontamer1',
    role: {
      rower: true,
      predators: [{
        predator: 1,
        guardian: 0,
      }, {
        predator: 3,
        guardian: 2,
      }]
    }
  }, {
    id: 5,
    name: '竜人',
    description: '竜使いが目を離すと魔獣使いと死霊使いを襲う。',
    appearance: 'dragonute1',
    role: {
      rower: false
    }
  }, {
    id: 6,
    name: '青国騎士',
    description: '赤国騎士が目を離すと赤国王女を襲う。',
    appearance: 'knight11',
    role: {
      rower: true,
      predators: [{
        predator: 1,
        guardian: 0,
      }, {
        predator: 3,
        guardian: 2,
      }, {
        predator: 5,
        guardian: 4,
      }]
    }
  }, {
    id: 7,
    name: '青国王女',
    appearance: 'princess11',
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0,
      }, {
        predator: 3,
        guardian: 2,
      }, {
        predator: 5,
        guardian: 4,
      }, {
        predator: 8,
        guardian: 6
      }]
    }
  }, {
    id: 8,
    name: '赤国騎士',
    description: '青国騎士が目を離すと青国王女を襲う。',
    appearance: 'knight21',
    role: {
      rower: true,
      predators: [{
        predator: 1,
        guardian: 0,
      }, {
        predator: 3,
        guardian: 2,
      }, {
        predator: 5,
        guardian: 4,
      }]
    }
  }, {
    id: 9,
    name: '赤国王女',
    appearance: 'princess21',
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0,
      }, {
        predator: 3,
        guardian: 2,
      }, {
        predator: 5,
        guardian: 4,
      }, {
        predator: 6,
        guardian: 8
      }]
    }
  }]
})
export default scene

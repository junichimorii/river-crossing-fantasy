import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 66,
  title: '魔獣使いと死霊使いと竜使い',
  category: 30,
  order: 8,
  rules: {
    conditions: [
      '登場人物をそれぞれの天敵から保護しつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。ただし筏（いかだ）を漕（こ）げるのは魔獣使い、死霊使い、竜使い、村人のみ。',
    tips: [
      '魔獣は、魔獣使いが目を離すと、近くにいる死霊使い、竜使い、村人を襲います。',
      'また死霊は、死霊使いが目を離すと、近くにいる魔獣使い、竜使い、村人を襲います。',
      'さらに竜人は、竜使いが目を離すと、近くにいる魔獣使い、死霊使い、村人を襲います。',
    ],
  },
  passing: 13,
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
    name: '村人A',
    appearance: 'villager1',
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
    name: '村人B',
    appearance: 'villager2',
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
  }]
})
export default scene

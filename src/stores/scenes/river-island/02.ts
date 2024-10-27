import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 74,
  title: '王女親衛隊の攻防+(2)',
  category: 95,
  order: 2,
  rules: {
    conditions: [
      '王女を他国の騎士から保護しつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。すべての登場人物が筏（いかだ）を漕（こ）げる。川の中の島に降りることもできる。',
    tips: [
      '川の中間にある中州に降りることができます。',
      '騎士は、他国の王女が近くにおり、かつその国の騎士が近くにいない場合、王女を襲います。'
    ],
  },
  landscape: {
    island: true
  },
  passing: 34,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: 'raft2'
  }],
  casts: [{
    id: 0,
    name: '青国騎士',
    description: '他国の騎士が目を離すと他国の王女を襲う。',
    appearance: 'knight1',
    role: {
      rower: true
    }
  }, {
    id: 1,
    name: '青国王女',
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
      }, {
        predator: 8,
        guardian: 0
      }]
    }
  }, {
    id: 2,
    name: '赤国騎士',
    description: '他国の騎士が目を離すと他国の王女を襲う。',
    appearance: 'knight2',
    role: {
      rower: true
    }
  }, {
    id: 3,
    name: '赤国王女',
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
      }, {
        predator: 8,
        guardian: 2
      }]
    }
  }, {
    id: 4,
    name: '緑国騎士',
    description: '他国の騎士が目を離すと他国の王女を襲う。',
    appearance: 'knight3',
    role: {
      rower: true
    }
  }, {
    id: 5,
    name: '緑国王女',
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
      }, {
        predator: 8,
        guardian: 4
      }]
    }
  }, {
    id: 6,
    name: '紫国騎士',
    description: '他国の騎士が目を離すと他国の王女を襲う。',
    appearance: 'knight4',
    role: {
      rower: true
    }
  }, {
    id: 7,
    name: '紫国王女',
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
      }, {
        predator: 8,
        guardian: 6
      }]
    }
  }, {
    id: 8,
    name: '黒国騎士',
    description: '他国の騎士が目を離すと他国の王女を襲う。',
    appearance: 'knight5',
    role: {
      rower: true
    }
  }, {
    id: 9,
    name: '黒国王女',
    appearance: 'princess51',
    role: {
      rower: true,
      predators: [{
        predator: 0,
        guardian: 8
      }, {
        predator: 2,
        guardian: 8
      }, {
        predator: 4,
        guardian: 8
      }, {
        predator: 6,
        guardian: 8
      }]
    }
  }]
})
export default scene

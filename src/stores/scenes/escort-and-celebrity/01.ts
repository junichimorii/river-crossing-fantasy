import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 11,
  title: '王女親衛隊の攻防(1)',
  category: 3,
  order: 1,
  rules: {
    conditions: [
      '王女を他国の騎士から保護しつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。すべての登場人物が筏（いかだ）を漕（こ）げる。',
    tips: [
      '騎士達が同国の王女を保護しながら川を渡るパズルです。',
      '騎士は、他国の王女が近くにおり、かつその国の騎士が近くにいない場合、**王女を襲います**。'
    ],
  },
  passing: 5,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: 'raft2'
  }],
  casts: [{
    id: 0,
    name: '青国騎士',
    description: '他国の騎士が目を離すと他国の王女を襲う。',
    appearance: 'knight11',
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
        guardian: 0,
      }]
    }
  }, {
    id: 2,
    name: '赤国騎士',
    description: '他国の騎士が目を離すと他国の王女を襲う。',
    appearance: 'knight21',
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
        guardian: 2,
      }]
    }
  }]
})
export default scene

import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 7,
  title: '王女親衛隊の攻防（初級編）',
  description: {
    conditions: '王女を他国の騎士から保護しつつ、すべての登場人物を最小回数で対岸に渡す',
    transportation: '2人乗りの舟が1<ruby>艘<rt>そう</rt></ruby>。すべての登場人物が舟を<ruby>漕<rt>こ</rt></ruby>げる。',
    tips: [
      '騎士達が同国の王女を保護しながら川を渡るパズルです。',
      '王女は、他国の騎士が近くにいて、かつ同国の騎士が近くにいない場合、他国の騎士に襲われてしまいます。',
    ],
  },
  category: 'escorting-celebrity',
  level: 2,
  passing: 5,
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
        guardian: 0,
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
        guardian: 2,
      }]
    }
  }]
})
export default scene

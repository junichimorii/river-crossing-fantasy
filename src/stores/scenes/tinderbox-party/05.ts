import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 28,
  title: '一触即発パーティ(5)',
  category: 8,
  order: 5,
  rules: {
    conditions: [
      '登場人物をそれぞれの天敵から保護しつつ、エルフと人間が筏（いかだ）に同乗しないよう気を遣い、かつ吟遊詩人が独りぼっちにならないよう気を遣いながら、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。ただし筏（いかだ）を漕（こ）げるのは魔獣使い、エルフ、吟遊詩人のみ。',
    tips: [
      '魔獣は、魔獣使いが目を離すと、近くにいる全員を襲います。',
      'エルフは、人間と一緒に筏（いかだ）に乗ることを嫌います。',
      '吟遊詩人は、独りきりになることを嫌います。'
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
    }
  }, {
    id: 1,
    name: '魔獣',
    description: '魔獣使いが目を離すと魔獣使い以外の全員を襲う。',
    appearance: 'therianthropy1',
    role: {
      rower: false,
      demihuman: true
    }
  }, {
    id: 2,
    name: 'エルフA',
    appearance: 'elf1',
    role: {
      rower: true,
      demihuman: true,
      misanthrope: true,
      predators: [{
        predator: 1,
        guardian: 0
      }]
    }
  }, {
    id: 3,
    name: 'エルフB',
    appearance: 'elf2',
    role: {
      rower: true,
      demihuman: true,
      misanthrope: true,
      predators: [{
        predator: 1,
        guardian: 0
      }]
    }
  }, {
    id: 4,
    name: '吟遊詩人',
    appearance: 'bard1',
    role: {
      rower: true,
      monophobia: true,
      predators: [{
        predator: 1,
        guardian: 0,
      }]
    }
  }, {
    id: 5,
    name: '村人a',
    appearance: 'villager1',
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0
      }]
    }
  }, {
    id: 6,
    name: '村人b',
    appearance: 'villager2',
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0
      }]
    }
  }]
})
export default scene

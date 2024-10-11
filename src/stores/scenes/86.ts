import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 28,
  title: '一触即発パーティ(6)',
  category: 8,
  order: 6,
  rules: {
    conditions: [
      '登場人物をそれぞれの天敵から保護しつつ、エルフと人間が筏（いかだ）に同乗しないよう気を遣い、かつ筏（いかだ）を修理しながら、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。ただし筏（いかだ）を漕（こ）げるのは魔獣使い、エルフ、大工のみ。',
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
    id: 3,
    name: '村人b',
    appearance: 'villager2',
    role: {
      rower: false,
      predators: [{
        predator: 1,
        guardian: 0
      }]
    }
  }, {
    id: 4,
    name: 'エルフ',
    description: '人間と一緒に筏（いかだ）に乗ることを嫌う。',
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
    id: 5,
    name: '大工A',
    appearance: 'carpenter1',
    role: {
      rower: true,
      repairer: true,
      predators: [{
        predator: 1,
        guardian: 0,
      }]
    }
  }, {
    id: 6,
    name: '大工B',
    appearance: 'carpenter2',
    role: {
      rower: true,
      repairer: true,
      predators: [{
        predator: 1,
        guardian: 0,
      }]
    }
  }]
})
export default scene

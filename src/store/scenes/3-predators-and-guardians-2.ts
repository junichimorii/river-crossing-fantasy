import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 21,
  title: '一触即発パーティ（中級編2）',
  level: 3,
  category: 'predators-and-guardians',
  rules: {
    conditions: [
      '登場人物をそれぞれの天敵から保護しつつ、エルフと人間が筏（いかだ）に同乗しないよう気を遣い、かつ吟遊詩人が独りぼっちにならないよう気を遣いながら、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。ただし筏（いかだ）を漕（こ）げるのは魔獣使い、村人、エルフ、吟遊詩人のみ。',
  },
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
    name: '魔獣使い',
    appearance: {
      sprite: 'beasttamer1'
    },
    role: {
      rower: true
    }
  }, {
    id: 1,
    name: '魔獣',
    description: '魔獣使いが目を離すと魔獣使い以外の全員を襲う。',
    appearance: {
      sprite: 'therianthropy1'
    },
    role: {
      rower: false
    }
  }, {
    id: 2,
    name: '村人',
    appearance: {
      sprite: 'villager1',
    },
    role: {
      rower: true,
      predators: [{
        predator: 1,
        guardian: 0
      }]
    }
  }, {
    id: 3,
    name: 'エルフ',
    description: '人間と一緒に筏（いかだ）に乗ることを嫌う。',
    appearance: {
      sprite: 'elf1',
    },
    role: {
      rower: true,
      aversions: [0, 2, 4],
      predators: [{
        predator: 1,
        guardian: 0
      }]
    }
  }, {
    id: 4,
    name: '吟遊詩人',
    description: '独りぼっちを嫌う。',
    appearance: {
      sprite: 'bard1',
    },
    role: {
      rower: true,
      monophobia: true,
      predators: [{
        predator: 1,
        guardian: 0
      }]
    }
  }]
})
export default scene

import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 21,
  title: '一触即発パーティ(2)',
  category: 80,
  order: 2,
  rules: {
    conditions: [
      '登場人物をそれぞれの天敵から保護し、エルフと道化師に気を遣いつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。ただし筏（いかだ）を漕（こ）げるのは魔獣使い、村人、エルフ、道化師のみ。',
    tips: [
      '魔獣は、魔獣使いが目を離すと、近くにいる全員を襲います。',
      'エルフは、人間と一緒に筏（いかだ）に乗ることを嫌います。',
      '道化師は、自由に行動できる状態になると逃走を企てます。'
    ],
  },
  passing: 11,
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
      rower: true
    }
  }, {
    id: 1,
    name: '魔獣',
    description: '魔獣使いが目を離すと近くにいる全員を襲う。',
    appearance: 'therianthropy1',
    role: {
      rower: false,
      demihuman: true
    }
  }, {
    id: 2,
    name: 'エルフ',
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
    name: '道化師',
    appearance: 'clown1',
    role: {
      rower: true,
      freespirited: true,
      predators: [{
        predator: 1,
        guardian: 0
      }]
    }
  }, {
    id: 4,
    name: '村人',
    appearance: 'villager1',
    role: {
      rower: true,
      predators: [{
        predator: 1,
        guardian: 0
      }]
    }
  }]
})
export default scene

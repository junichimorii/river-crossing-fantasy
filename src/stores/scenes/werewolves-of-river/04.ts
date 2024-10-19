import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 88,
  title: '川を渡るのは人狼なりや？(4)',
  category: 5,
  order: 4,
  rules: {
    conditions: [
      '両岸および筏（いかだ）の上で村人陣営が過半数を維持しつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '3人乗りの筏（いかだ）が1艘（そう）。ただし筏（いかだ）を漕（こ）げるのは騎士のみ。',
    tips: [
      '人狼は2人います。',
      '村人陣営は、村人4人と騎士1人の計5人です。',
      'また、村人と人狼は筏（いかだ）を漕（こ）ぐことができません。',
    ],
  },
  passing: 7,
  carriers: [{
    id: 0,
    capacity: 3,
    appearance: 'raft3'
  }],
  casts: [{
    id: 0,
    name: '騎士',
    appearance: 'knight1',
    role: {
      rower: true
    }
  }, {
    id: 1,
    name: '村人a',
    appearance: 'villager1',
    role: {
      rower: false
    }
  }, {
    id: 2,
    name: '村人b',
    appearance: 'villager2',
    role: {
      rower: false
    }
  }, {
    id: 3,
    name: '村人c',
    appearance: 'villager3',
    role: {
      rower: false
    }
  }, {
    id: 4,
    name: '村人d',
    appearance: 'villager4',
    role: {
      rower: false
    }
  }, {
    id: 5,
    name: '人狼a',
    appearance: 'lycanthropy1',
    role: {
      rower: false,
      werewolf: true,
    }
  }, {
    id: 6,
    name: '人狼b',
    appearance: 'lycanthropy2',
    role: {
      rower: false,
      werewolf: true,
    }
  }]
})
export default scene

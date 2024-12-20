import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 90,
  title: '川を渡るのは人狼なりや？(6)',
  category: 55,
  order: 6,
  rules: {
    conditions: [
      '両岸および筏（いかだ）の上で村人陣営が過半数を維持しつつ、すべての登場人物を対岸に渡す',
    ],
    transportation: '筏（いかだ）を漕（こ）げるのは騎士のみ。',
    tips: [
      '人狼は3人います。',
      '村人陣営は、村人5人と騎士1人の計5人です。',
      'また、村人と人狼は筏（いかだ）を漕（こ）ぐことができません。',
    ],
  },
  passing: 9,
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
    name: '村人e',
    appearance: 'villager5',
    role: {
      rower: false
    }
  }, {
    id: 6,
    name: '人狼a',
    appearance: 'lycanthropy1',
    role: {
      rower: false,
      werewolf: true,
    }
  }, {
    id: 7,
    name: '人狼b',
    appearance: 'lycanthropy2',
    role: {
      rower: false,
      werewolf: true,
    }
  }, {
    id: 8,
    name: '人狼c',
    appearance: 'lycanthropy3',
    role: {
      rower: false,
      werewolf: true,
    }
  }]
})
export default scene

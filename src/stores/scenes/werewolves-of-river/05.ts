import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 89,
  title: '川を渡るのは人狼なりや？(5)',
  category: 5,
  order: 5,
  rules: {
    conditions: [
      '両岸および筏（いかだ）の上で村人陣営が過半数を維持しつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '3人乗りの筏（いかだ）が1艘（そう）。すべての登場人物が筏（いかだ）を漕（こ）げる。',
    tips: [
      '人狼の数が**3人**に増えています。',
      '村人陣営は、村人5人と占い師1人の計5人です。',
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
    name: '村人A',
    appearance: 'villager1',
    role: {
      rower: true
    }
  }, {
    id: 1,
    name: '村人B',
    appearance: 'villager2',
    role: {
      rower: true
    }
  }, {
    id: 2,
    name: '村人C',
    appearance: 'villager3',
    role: {
      rower: true
    }
  }, {
    id: 3,
    name: '村人D',
    appearance: 'villager4',
    role: {
      rower: true
    }
  }, {
    id: 4,
    name: '村人E',
    appearance: 'villager5',
    role: {
      rower: true
    }
  }, {
    id: 5,
    name: '占い師',
    appearance: 'fortuneteller1',
    role: {
      rower: true
    }
  }, {
    id: 6,
    name: '人狼A',
    appearance: 'lycanthropy1',
    role: {
      rower: true,
      werewolf: true,
    }
  }, {
    id: 7,
    name: '人狼B',
    appearance: 'lycanthropy2',
    role: {
      rower: true,
      werewolf: true,
    }
  }, {
    id: 8,
    name: '人狼C',
    appearance: 'lycanthropy3',
    role: {
      rower: true,
      werewolf: true,
    }
  }]
})
export default scene

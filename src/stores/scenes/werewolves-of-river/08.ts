import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 92,
  title: '川を渡るのは人狼なりや？(8)',
  category: 55,
  order: 8,
  rules: {
    conditions: [
      '両岸および筏（いかだ）の上で村人陣営が過半数を維持しつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。すべての登場人物が筏（いかだ）を漕（こ）げる。',
    tips: [
      '筏（いかだ）の定員は2名です。',
      '人狼の数が**2人**に増えています。',
      '村人陣営は村人5人、占い師1人、騎士1人の計7人です。',
    ],
  },
  passing: 17,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: 'raft2'
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
    name: '騎士',
    appearance: 'knight1',
    role: {
      rower: true
    }
  }, {
    id: 7,
    name: '人狼A',
    appearance: 'lycanthropy1',
    role: {
      rower: true,
      werewolf: true,
    }
  }, {
    id: 8,
    name: '人狼B',
    appearance: 'lycanthropy2',
    role: {
      rower: true,
      werewolf: true,
    }
  }]
})
export default scene

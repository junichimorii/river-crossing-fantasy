import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 87,
  title: '川を渡るのは人狼なりや？(3)',
  category: 55,
  order: 3,
  rules: {
    conditions: [
      '両岸および筏（いかだ）の上で村人陣営が過半数を維持しつつ、すべての登場人物を対岸に渡す',
    ],
    tips: [
      '人狼の数が**2人**に増えています。',
      '村人陣営は、村人4人と占い師1人の計5人です。',
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
    name: '占い師',
    appearance: 'fortuneteller1',
    role: {
      rower: true
    }
  }, {
    id: 5,
    name: '人狼A',
    appearance: 'lycanthropy1',
    role: {
      rower: true,
      werewolf: true,
    }
  }, {
    id: 6,
    name: '人狼B',
    appearance: 'lycanthropy2',
    role: {
      rower: true,
      werewolf: true,
    }
  }]
})
export default scene

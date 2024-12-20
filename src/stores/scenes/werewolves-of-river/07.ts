import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 91,
  title: '川を渡るのは人狼なりや？(7)',
  category: 55,
  order: 7,
  rules: {
    conditions: [
      '両岸および筏（いかだ）の上で村人陣営が過半数を維持しつつ、すべての登場人物を対岸に渡す',
    ],
    tips: [
      '筏（いかだ）の定員が**2名**になっています。',
      '人狼は1人だけです。',
      '村人陣営は村人5人と占い師1人の計6人です。',
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
    name: '人狼',
    appearance: 'lycanthropy1',
    role: {
      rower: true,
      werewolf: true,
    }
  }]
})
export default scene

import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 37,
  title: '魔獣たちの反乱(4)',
  category: 50,
  order: 4,
  rules: {
    conditions: [
      '両岸および筏（いかだ）の上で魔獣使い側が半数以上を維持しつつ、すべての登場人物を対岸に渡す',
    ],
    tips: [
      '魔獣と魔獣使いが4組、筏（いかだ）の定員が3名になっています。',
    ],
  },
  passing: 9,
  carriers: [{
    id: 0,
    capacity: 3,
    appearance: 'raft3'
  }],
  crews: [{
    id: 0,
    name: '魔獣使いA',
    appearance: 'beasttamer1',
    role: {
      rower: true,
      rebel: false
    }
  }, {
    id: 1,
    name: '魔獣使いB',
    appearance: 'beasttamer2',
    role: {
      rower: true,
      rebel: false
    }
  }, {
    id: 2,
    name: '魔獣使いC',
    appearance: 'beasttamer3',
    role: {
      rower: true,
      rebel: false
    }
  }, {
    id: 3,
    name: '魔獣使いD',
    appearance: 'beasttamer4',
    role: {
      rower: true,
      rebel: false
    }
  }, {
    id: 4,
    name: '魔獣A',
    description: '魔獣使いの数より多くなると反乱を起こす。',
    appearance: 'therianthropy1',
    role: {
      rower: true,
      rebel: true
    }
  }, {
    id: 5,
    name: '魔獣B',
    description: '魔獣使いの数より多くなると反乱を起こす。',
    appearance: 'therianthropy2',
    role: {
      rower: true,
      rebel: true
    }
  }, {
    id: 6,
    name: '魔獣C',
    description: '魔獣使いの数より多くなると反乱を起こす。',
    appearance: 'therianthropy3',
    role: {
      rower: true,
      rebel: true
    }
  }, {
    id: 7,
    name: '魔獣D',
    description: '魔獣使いの数より多くなると反乱を起こす。',
    appearance: 'therianthropy4',
    role: {
      rower: true,
      rebel: true
    }
  }]
})
export default scene

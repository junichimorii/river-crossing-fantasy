import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 27,
  title: '魔獣たちの反乱(6)',
  category: 50,
  order: 6,
  rules: {
    conditions: [
      '両岸および筏（いかだ）の上で魔獣使い側が半数以上を維持しつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '3人乗りの筏（いかだ）が1艘（そう）。すべての登場人物が筏（いかだ）を漕（こ）げる。',
    tips: [
      '魔獣と魔獣使いが5組になっています。',
    ],
  },
  passing: 11,
  carriers: [{
    id: 0,
    capacity: 3,
    appearance: 'raft3'
  }],
  casts: [{
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
    name: '魔獣使いE',
    appearance: 'beasttamer5',
    role: {
      rower: true,
      rebel: false
    }
  }, {
    id: 5,
    name: '魔獣A',
    description: '魔獣使いの数より多くなると反乱を起こす。',
    appearance: 'therianthropy1',
    role: {
      rower: true,
      rebel: true
    }
  }, {
    id: 6,
    name: '魔獣B',
    description: '魔獣使いの数より多くなると反乱を起こす。',
    appearance: 'therianthropy2',
    role: {
      rower: true,
      rebel: true
    }
  }, {
    id: 7,
    name: '魔獣C',
    description: '魔獣使いの数より多くなると反乱を起こす。',
    appearance: 'therianthropy3',
    role: {
      rower: true,
      rebel: true
    }
  }, {
    id: 8,
    name: '魔獣D',
    description: '魔獣使いの数より多くなると反乱を起こす。',
    appearance: 'therianthropy4',
    role: {
      rower: true,
      rebel: true
    }
  }, {
    id: 9,
    name: '魔獣E',
    description: '魔獣使いの数より多くなると反乱を起こす。',
    appearance: 'therianthropy5',
    role: {
      rower: true,
      rebel: true
    }
  }]
})
export default scene

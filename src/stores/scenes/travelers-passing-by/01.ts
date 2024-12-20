import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 102,
  title: '魔獣たちの往還',
  category: 90,
  order: 1,
  rules: {
    conditions: [
      '両岸で魔獣使い側が半数以上を維持しつつ、すべての登場人物を初期位置の対岸に渡す',
    ],
    tips: [
      '登場人物は「魔獣たちの反乱(2)」と同じですが、魔獣使いたちが対岸にいる状態でスタートします。',
      'すべての登場人物をそれぞれの初期位置の対岸に渡してください。',
      '両岸において、魔獣の数が魔獣使いの数より多くなった場合、魔獣が反乱を起こします。',
    ],
  },
  passing: 5,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: 'raft2'
  }],
  casts: [{
    id: 0,
    name: '魔獣A',
    description: '魔獣使いの数より多くなると反乱を起こす。',
    appearance: 'therianthropy1',
    coord: -1,
    role: {
      rower: true,
      rebel: true
    }
  }, {
    id: 1,
    name: '魔獣B',
    description: '魔獣使いの数より多くなると反乱を起こす。',
    appearance: 'therianthropy2',
    coord: -1,
    role: {
      rower: true,
      rebel: true
    }
  }, {
    id: 2,
    name: '魔獣C',
    description: '魔獣使いの数より多くなると反乱を起こす。',
    appearance: 'therianthropy3',
    coord: -1,
    role: {
      rower: true,
      rebel: true
    }
  }, {
    id: 3,
    name: '魔獣使いA',
    appearance: 'beasttamer1',
    coord: 1,
    role: {
      rower: true,
      rebel: false
    }
  }, {
    id: 4,
    name: '魔獣使いB',
    appearance: 'beasttamer2',
    coord: 1,
    role: {
      rower: true,
      rebel: false
    }
  }, {
    id: 5,
    name: '魔獣使いC',
    appearance: 'beasttamer3',
    coord: 1,
    role: {
      rower: true,
      rebel: false
    }
  }]
})
export default scene

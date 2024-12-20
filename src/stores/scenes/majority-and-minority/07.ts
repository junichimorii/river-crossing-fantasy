import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 40,
  title: '魔獣たちの反乱(7)',
  category: 50,
  order: 7,
  rules: {
    conditions: [
      '両岸および筏（いかだ）の上で魔獣使い側が半数以上を維持しつつ、すべての登場人物を対岸に渡す',
    ],
    transportation: '筏（いかだ）を漕（こ）げるのは魔獣使いAと魔獣Aのみ。',
    tips: [
      '「魔獣たちの反乱(6)」とよく似ていますが、筏（いかだ）を漕（こ）げる登場人物が限定されています。',
    ],
  },
  passing: 13,
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
    name: '魔獣使いb',
    appearance: 'beasttamer2',
    role: {
      rower: false,
      rebel: false
    }
  }, {
    id: 2,
    name: '魔獣使いc',
    appearance: 'beasttamer3',
    role: {
      rower: false,
      rebel: false
    }
  }, {
    id: 3,
    name: '魔獣使いd',
    appearance: 'beasttamer4',
    role: {
      rower: false,
      rebel: false
    }
  }, {
    id: 4,
    name: '魔獣使いe',
    appearance: 'beasttamer5',
    role: {
      rower: false,
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
    name: '魔獣b',
    description: '魔獣使いの数より多くなると反乱を起こす。',
    appearance: 'therianthropy2',
    role: {
      rower: false,
      rebel: true
    }
  }, {
    id: 7,
    name: '魔獣c',
    description: '魔獣使いの数より多くなると反乱を起こす。',
    appearance: 'therianthropy3',
    role: {
      rower: false,
      rebel: true
    }
  }, {
    id: 8,
    name: '魔獣d',
    description: '魔獣使いの数より多くなると反乱を起こす。',
    appearance: 'therianthropy4',
    role: {
      rower: false,
      rebel: true
    }
  }, {
    id: 9,
    name: '魔獣e',
    description: '魔獣使いの数より多くなると反乱を起こす。',
    appearance: 'therianthropy5',
    role: {
      rower: false,
      rebel: true
    }
  }]
})
export default scene

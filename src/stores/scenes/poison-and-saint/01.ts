import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 77,
  title: '聖女は毒を浄化する(1)',
  category: 7,
  order: 1,
  rules: {
    conditions: [
      '毒による状態異常に注意しつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '2人乗りの筏（いかだ）が1艘（そう）。ただし筏（いかだ）を漕（こ）げるのは聖女以外。',
    tips: [
      '毒の川を渡るパズルです。川を渡った登場人物は毒に侵され、**筏（いかだ）を漕（こ）ぐことができなくなります。**',
      '毒に侵されている登場人物には、状態異常を示すマーク（❤️‍🩹）が表示されます。',
      'ただし、**聖女は毒の影響を受けません**。また、**聖女の同乗者も毒の影響を受けません**。',
      'それぞれの岸にいる登場人物全員が状態異常となった場合、**その時点でクリア失敗**となります。',
    ],
  },
  landscape: {
    poison: true
  },
  passing: 3,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: 'raft2'
  }],
  casts: [{
    id: 0,
    name: '戦士',
    appearance: 'fighter1',
    role: {
      rower: true
    }
  }, {
    id: 1,
    name: '盗賊',
    appearance: 'thief1',
    role: {
      rower: true
    }
  }, {
    id: 2,
    name: '聖女',
    appearance: 'priest1',
    role: {
      rower: false,
      saint: true
    }
  }]
})
export default scene

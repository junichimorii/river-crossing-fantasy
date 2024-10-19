import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 85,
  title: '川を渡るのは人狼なりや？(1)',
  category: 5,
  order: 1,
  rules: {
    conditions: [
      '両岸および筏（いかだ）の上で村人陣営が過半数を維持しつつ、すべての登場人物を対岸に渡す',
      '最小回数でクリアする'
    ],
    transportation: '3人乗りの筏（いかだ）が1艘（そう）。すべての登場人物が筏（いかだ）を漕（こ）げる。',
    tips: [
      '村人陣営 （人狼以外）が**過半数**を維持しつつ川を渡るパズルです。',
      '両岸および筏（いかだ）の上において、**人狼の数が村人陣営と同数以上になった場合、人狼が村人陣営を襲います**。',
      '岸への到着時、村人陣営が危機を回避できない場合はその時点でクリア失敗となります。',
    ],
  },
  passing: 3,
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
    name: '人狼',
    appearance: 'lycanthropy1',
    role: {
      rower: true,
      werewolf: true,
    }
  }]
})
export default scene

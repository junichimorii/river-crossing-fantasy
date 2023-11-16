import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 6,
  title: '闇夜の旅（入門編）',
  description: {
    conditions: 'すべての登場人物を7分以内に対岸に渡す',
    transportation: '吊り橋の人数制限は2人まで。移動時はたいまつが必要。',
    tips: [
      '夜のステージは、移動時にたいまつが必要です。また、たいまつが燃え尽きる制限時間も決まっています。',
      '登場人物を上方向にスワイプすると、たいまつの近くにセットされます。',
      '橋を渡るのに必要な所要時間は登場人物毎に異なります。2人以上で移動する時は、遅いほうに合わせて同時に移動します。',
    ],
  },
  category: 'time-limited',
  landscape: {
    night: true
  },
  level: 1,
  passing: 7,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: {
      sprite: '/images/carriers/touch.png'
    }
  }],
  casts: [{
    id: 0,
    name: '盗賊',
    appearance: {
      sprite: '/images/casts/thief1.png'
    },
    role: {
      duration: 1
    }
  }, {
    id: 1,
    name: '戦士',
    appearance: {
      sprite: '/images/casts/fighter1.png'
    },
    role: {
      duration: 2
    }
  }, {
    id: 2,
    name: '司祭',
    appearance: {
      sprite: '/images/casts/priest1.png'
    },
    role: {
      duration: 4
    }
  }]
})
export default scene

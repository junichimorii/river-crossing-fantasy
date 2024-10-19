import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 42,
  title: '闇夜の旅路(1)',
  category: 9,
  order: 1,
  rules: {
    conditions: [
      'すべての登場人物を対岸に渡す',
      '1分以内にクリアする'
    ],
    transportation: '移動時はたいまつが必要。',
    tips: [
      '夜のステージは、移動時にたいまつが必要です。また、たいまつが燃え尽きる制限時間も決まっています。',
      '登場人物を上方向にスワイプすると、たいまつの近くにセットされます。表示されたボタンをタップすると対岸へ移動します。',
    ],
  },
  landscape: {
    night: true
  },
  passing: 1,
  level: 1,
  carriers: [{
    id: 0,
    capacity: 1,
    appearance: 'touch'
  }],
  casts: [{
    id: 0,
    name: '盗賊',
    appearance: 'thief1',
    role: {
      duration: 1
    }
  }]
})
export default scene

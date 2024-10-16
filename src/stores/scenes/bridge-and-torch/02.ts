import type { Scene } from '@/types'
const scene: Scene = Object.freeze({
  id: 5,
  title: '闇夜の旅路(2)',
  category: 8,
  order: 2,
  rules: {
    conditions: [
      'すべての登場人物を対岸に渡す',
      '7分以内にクリアする'
    ],
    transportation: '吊り橋の人数制限は2人まで。移動時はたいまつが必要。',
    tips: [
      '橋を渡るのに必要な所要時間は登場人物毎に異なります。2人以上で移動する時は、遅いほうに合わせて同時に移動します。',
      'たとえば、盗賊は1人で橋を渡るのに1分かかりますが、戦士と同時に渡ると2分かかります。',
    ],
  },
  landscape: {
    night: true
  },
  passing: 7,
  level: 2,
  carriers: [{
    id: 0,
    capacity: 2,
    appearance: 'touch'
  }],
  casts: [{
    id: 0,
    name: '盗賊',
    appearance: 'thief1',
    role: {
      duration: 1
    }
  }, {
    id: 1,
    name: '戦士',
    appearance: 'fighter1',
    role: {
      duration: 2
    }
  }, {
    id: 2,
    name: '司祭',
    appearance: 'priest1',
    role: {
      duration: 4
    }
  }]
})
export default scene

import type { Scene } from '@/types/scene'
const scene: Scene = Object.freeze({
  id: 49,
  title: '闇夜の旅路(6)',
  category: 7,
  order: 6,
  rules: {
    conditions: [
      'すべての登場人物を対岸に渡す',
      '最短時間でクリアする'
    ],
    transportation: '吊り橋の人数制限は3人まで。移動時はたいまつが必要。',
    tips: [
      '橋は同時に3人まで渡ることができます。最も遅い登場人物に合わせて移動します。',
    ],
  },
  landscape: {
    night: true
  },
  passing: 9,
  carriers: [{
    id: 0,
    capacity: 3,
    appearance: 'touch'
  }],
  casts: [{
    id: 0,
    name: '盗賊A',
    appearance: 'thief1',
    role: {
      duration: 1
    }
  }, {
    id: 1,
    name: '盗賊B',
    appearance: 'thief2',
    role: {
      duration: 1
    }
  }, {
    id: 2,
    name: '司祭A',
    appearance: 'priest1',
    role: {
      duration: 5
    }
  }, {
    id: 3,
    name: '司祭B',
    appearance: 'priest2',
    role: {
      duration: 5
    }
  }, {
    id: 4,
    name: '司祭C',
    appearance: 'priest3',
    role: {
      duration: 5
    }
  }]
})
export default scene

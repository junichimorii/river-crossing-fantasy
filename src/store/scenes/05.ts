import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 5,
  title: '闇夜の旅（初級編1）',
  description: {
    conditions: 'すべてのキャラクターを2分以内に対岸に渡す',
    transportation: '吊り橋の人数制限は2人まで。移動時はたいまつが必要。',
  },
  tips: [
    '夜のステージは、移動時にたいまつが必要です。また、たいまつが燃え尽きる制限時間も決まっています。',
    'キャラクターを上方向にスワイプすると、たいまつの近くにセットされます。',
    '橋を渡るのに必要な所要時間はキャラクター毎に異なります。2人以上で移動する時は、遅いほうに合わせて同時に移動します。',
  ],
  category: 'time-limited',
  landscape: '/images/landscapes/night-bridge.png',
  passing: 2,
  carriers: [{
    id: 0,
    appearance: '/images/carriers/touch.png',
    capacity: 2,
  }],
  casts: [{
    id: 0,
    avatar: '/images/casts/thief1.png',
    name: '盗賊',
    role: {
      duration: 1, 
    },
  }, {
    id: 1,
    avatar: '/images/casts/fighter1.png',
    name: '戦士',
    role: {
      duration: 2, 
    },
  }],
}) as Scene
export default scene

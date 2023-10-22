import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 5,
  title: '闇夜の冒険(1)',
  description: {
    conditions: 'すべてのキャラクターが2分以内に対岸に渡る',
    transportation: '吊り橋の人数制限は2人まで。移動時はたいまつが必要。',
  },
  tips: [
    '夜のステージは、移動時にたいまつが必要です。また、たいまつが燃え尽きる制限時間も決まっています。',
    '橋を渡るのに必要な所要時間はキャラクター毎に異なります。',
    '2人以上で移動する時は、遅いほうに合わせて同時に移動します。',
  ],
  category: 'time-limited',
  passing: 2,
  landscape: '/images/landscapes/night-bridge.png',
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

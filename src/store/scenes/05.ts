import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 5,
  title: '夜間旅行',
  description: {
    conditions: 'すべての登場人物が2分以内に対岸に渡る',
    transportation: '吊り橋の人数制限は2人まで。移動時はたいまつを持ち、遅い方に合わせて同時に移動する。',
  },
  category: 'bridgeAndTorch',
  passing: 2,
  landscape: '/images/landscapes/night-bridge.png',
  carriers: [{
    id: 0,
    appearance: '/images/carriers/touch.png',
    capacity: 2,
  }],
  casts: [{
    id: 0,
    avatar: '/images/casts/villager1.png',
    name: '旅人A',
    role: {
      canRow: true,
      duration: 1, 
    },
  }, {
    id: 1,
    avatar: '/images/casts/villager2.png',
    name: '旅人B',
    role: {
      canRow: true,
      duration: 2, 
    },
  }],
}) as Scene
export default scene

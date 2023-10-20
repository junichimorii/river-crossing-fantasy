import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 10,
  title: '15分の夜間旅行',
  description: {
    conditions: 'すべてのキャラクターが15分以内に対岸に渡る',
    transportation: '吊り橋の人数制限は2人まで。',
  },
  category: 'time-limited',
  passing: 15,
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
      duration: 1, 
    },
  }, {
    id: 1,
    avatar: '/images/casts/villager2.png',
    name: '旅人B',
    role: {
      duration: 2, 
    },
  }, {
    id: 2,
    avatar: '/images/casts/villager3.png',
    name: '旅人B',
    role: {
      duration: 5, 
    },
  }, {
    id: 3,
    avatar: '/images/casts/villager4.png',
    name: '旅人B',
    role: {
      duration: 8, 
    },
  }],
}) as Scene
export default scene

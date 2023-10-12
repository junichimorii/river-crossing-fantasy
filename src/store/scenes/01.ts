import type { Scene } from '@/types/scene'
const scene = Object.freeze({
  id: 1,
  title: '一人旅',
  description: {
    conditions: 'すべての登場人物が対岸に渡る',
    transportation: '1人乗りのボートが1艘',
  },
  category: 'single-seated',
  passing: 1,
  landscape: '/images/landscapes/daytime-river.png',
  carriers: [{
    id: 0,
    appearance: '/images/carriers/boat1.png',
    capacity: 1,
  }],
  casts: [{
    id: 0,
    avatar: '/images/casts/villager1.png',
    description: '旅人A',
    role: {
      canRow: true,
    },
  }],
}) as Scene
export default scene

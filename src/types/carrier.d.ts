import type { Cast } from '@/types/cast'

// 川渡りパズルの乗り物
export interface Carrier {
  id: number
  capacity: number  // 定員
  status: Status
}

// 川渡りパズルの乗り物の状態
export interface Status {
  isCrossed: boolean      // 開始地点の対岸にいる
  passengers: Cast[]  // 乗員
}
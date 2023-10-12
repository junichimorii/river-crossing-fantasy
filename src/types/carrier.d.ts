import type { Cast } from '@/types/cast'

/**
 * 乗り物
 */
export interface Carrier {
  /** 乗り物のID */
  id: number
  /** 乗り物の画像URL */
  appearance: string
  /** 乗り物の定員 */
  capacity: number
  /** 乗り物の状態 */
  status: Status
}
/**
 * 乗り物の状態
 */
export interface Status {
  /** 開始地点の対岸にいるかどうか */
  isCrossed: boolean
  /** 進行中かどうか */
  isSailing: boolean
  /** 乗員 */
  passengers: Cast[]
}

/**
 * 乗り物の進行方向
 */
export type Direction = 'up'|'down'
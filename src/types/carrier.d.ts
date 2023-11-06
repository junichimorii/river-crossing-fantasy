/**
 * 乗り物
 */
export interface Carrier {
  /** 乗り物のID */
  id: number
  /** 乗り物の定員 */
  capacity: number
  /** 乗り物の重量制限 */
  weightLimit?: number
  /** 乗り物の外観 */
  appearance: Appearance
}

/**
 * 乗り物の外観
 */
interface Appearance {
  /** 乗り物の画像URL */
  sprite: string
  /** 乗り物の画像の比率 */
  ratio?: number
}

/**
 * 乗り物の進行方向
 */
export type Direction = 'up' | 'down'
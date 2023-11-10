/**
 * オブジェクトの状態
 */
export interface State {
  /**
   * ステージに登場する乗り物
   */
  carriers: CarrierState[]
  /**
   * ステージの登場人物
   */
  casts: CastState[]
}

/**
 * 乗り物の状態
 */
export interface CarrierState {
  /**
   * 開始地点の対岸にいるかどうか
   */
  isCrossed: boolean
  /**
   * 中州にいるかどうか
   */
  isHalfway?: boolean
}

/**
 * 登場人物の状態
 */
export interface CastState {
  /**
   * 開始地点の対岸にいるかどうか
   */
  isCrossed: boolean
  /**
   * 乗っている乗り物
   */
  boarding: number | null
  /**
   * 登場人物の感情
   */
  emotions: Emotion[]
}
/**
 * 登場人物の感情
 */
export type Emotion = 'scared'|'excited'|'surprised'

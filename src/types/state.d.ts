/**
 * オブジェクトの状態
 */
export interface State {
  /** ステージに登場する乗り物 */
  carriers: CarrierState[]
  /** ステージの登場人物 */
  casts: CastState[]
}

/**
 * 乗り物の状態
 */
export interface CarrierState {
  /** 乗り物の座標 */
  coord: number
}

/**
 * 登場人物の状態
 */
export interface CastState {
  /** 登場人物の座標 */
  coord: number
  /** 乗っている乗り物 */
  boarding: number | null
  /** 登場人物の感情 */
  emotions: Emotion[]
  /** 登場人物の健康状態 */
  diseased: boolean
}

/**
 * 乗り物の行先
 */
export type Bound = 'inbound' | 'outbound' | null

/**
 * 登場人物の感情
 *   scared: 😰怖い、危機に瀕（ひん）している
 *   excited: 😈興奮している、喜んでいる
 *   surprised: 😖驚いている、困っている
 */
export type Emotion = 'scared' | 'excited' | 'surprised'

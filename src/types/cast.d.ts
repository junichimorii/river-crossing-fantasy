/**
 * 登場人物
 */
export interface Cast {
  /** 登場人物のID */
  id: number
  /** 登場人物の画像URL */
  avatar: string
  /** 登場人物の名前 */
  name: string
  /** 登場人物の説明 */
  description?: string
  /** 登場人物の役割 */
  role: Role
  /** 登場人物のステータス */
  status: Status
}
/**
 * 登場人物の役割
 */
export interface Role {
  /** 乗り物を操作できる */
  canRow: boolean 
  /** 敵のID */
  enemies?: number[] 
  /** 守護者のID */
  guardian?: number 
  /** 所要時間 */
  duration?: number 
}
/**
 * 登場人物の状態
 */
export interface Status {
  /** 操作が無効である */
  disabled: boolean 
  /** 開始地点の対岸にいる */
  isCrossed: boolean 
  /** 乗り物の上にいる */
  isSeated: boolean 
  /** 感情 */
  emotions: string[]
}

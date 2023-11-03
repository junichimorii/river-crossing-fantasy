/**
 * 登場人物
 */
export interface Cast {
  /** 登場人物のID */
  id: number
  /** 登場人物の名前 */
  name: string
  /** 登場人物の説明 */
  description?: string
  /** 登場人物の外観 */
  appearance: Appearance
  /** 登場人物の役割 */
  role: Role
  /** 登場人物のステータス */
  status: Status
}

/**
 * 登場人物の外観
 */
interface Appearance {
  /** 登場人物の画像URL */
  sprite: string
  /** 登場人物の画像の比率 */
  ratio?: number
}

/**
 * 登場人物の役割
 */
interface Role {
  /** 乗り物を操作できる */
  canRow?: boolean
  /** 重量 */
  weight?: number
  /** 所要時間 */
  duration?: number
  /** 天敵と保護者 */
  predators?: {
    predator: number  // 敵のID
    guardian: number  // 保護者のID
  }[]
  /** （半数以上を維持するパズルにおける）反逆者 */
  rebel?: boolean
}

/**
 * 登場人物の状態
 */
export interface Status {
  /** 開始地点の対岸にいる */
  isCrossed: boolean
  /** 乗っている乗り物 */
  boarding: number | undefined
  /** 登場人物の感情 */
  emotions: ('scared'|'excited'|'surprised')[]
}

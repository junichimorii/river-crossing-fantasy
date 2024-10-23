import type { Carrier, Cast } from '@/types'

/**
 * シーン
 */
export interface Scene {
  /** シーンのID */
  id: number
  /** シーンの表題 */
  title: string
  /** パズル種別 */
  category: number
  /** パズル種別 */
  order: number
  /** パズルのルール */
  rules: Rules
  /** パズルの特徴 */
  landscape?: Features
  /** 合格基準となる回数または時間 */
  passing: number
  /** 難易度 */
  level?: number
  /** 乗り物 */
  carriers: Carrier[]
  /** 登場人物 */
  casts: Cast[]
}

/**
 * パズルの特徴
 */
type Features = {
  island?: boolean
  night?: boolean
  poison?: boolean
}

/**
 * パズルのルール
 */
interface Rules {
  /** ステージのクリア条件 */
  conditions: string[]
  /** ステージに登場する乗り物の説明 */
  transportation: string
  /** ヒント */
  tips?: string[]
}

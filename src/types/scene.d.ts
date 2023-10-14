import type { Category } from '@/types/records'
import type { Carrier } from '@/types/carrier'
import type { Cast } from '@/types/cast'

/**
 * シーン
 */
export interface Scene {
  /** ステージのID */
  id: number
  /** ステージの表題 */
  title: string
  /** ステージの説明 */
  description: {
    /** ステージのクリア条件 */
    conditions: string
    /** ステージに登場する乗り物の説明 */
    transportation: string
  }
  /** パズル種別 */
  category: Category | null
  /** ステージの合格基準となる回数または時間 */
  passing: number
  /** ステージの背景画像URL */
  landscape: string
  /** ステージに登場する乗り物 */
  carriers: Carrier[]
  /** ステージの登場人物 */
  casts: Cast[]
}

/**
 * 履歴
 */
export interface History {
  /** 移動した登場人物 */
  casts: Cast[]
  /** 所要時間 */
  duration: number 
}

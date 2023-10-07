import { Carrier } from '@/types/carrier'
import { Cast } from '@/types/cast'

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
  /** ステージの背景画像URL */
  landscape: string
  /** ステージに登場する乗り物 */
  carriers: Carrier[]
  /** ステージの登場人物 */
  casts: Cast[]
}
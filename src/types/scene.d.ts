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
  /** ヒント */
  tips?: string[]
  /** パズル種別 */
  category: Category
  /** 難易度 */
  level?: string
  /** ステージの背景画像URL */
  landscape: string
  /** ステージの合格基準となる回数または時間 */
  passing: number
  /** ステージに登場する乗り物 */
  carriers: Carrier[]
  /** ステージの登場人物 */
  casts: Cast[]
}

/**
 * パズル種別
 */
export type Category =
  'unconditioned'             // 乗り物の定員以外の制限がない川渡りパズル
  |'qualified'                // 乗り物を操作できる人が決まっている川渡りパズル
  |'weight-limited'           // 重量制限のある川渡りパズル
  |'predators-and-guardians'  // 敵と保護者がいる川渡りパズル
  |'escorting-celebrity'      // 要人を敵から保護する川渡りパズル
  |'keep-majority'            // 多数派を維持する川渡りパズル
  |'time-limited'             // 制限時間のある川渡りパズル

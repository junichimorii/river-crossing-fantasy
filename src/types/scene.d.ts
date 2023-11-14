import type { Carrier } from '@/types/carrier'
import type { Cast } from '@/types/cast'

/**
 * シーン
 */
export interface Scene {
  /** シーンのID */
  id: number
  /** シーンの表題 */
  title: string
  /** シーンの説明 */
  description: Description
  /** パズル種別 */
  category: Category
  /** パズルの特徴 */
  landscape?: Features
  /** 難易度 */
  level: number
  /** 合格基準となる回数または時間 */
  passing: number
  /** 乗り物 */
  carriers: Carrier[]
  /** 登場人物 */
  casts: Cast[]
}

/**
 * パズル種別
 */
export type Category =
  'unconditioned'               // 乗り物の定員以外の制限がない川渡りパズル
  |'qualified'                  // 乗り物を操作できる人が決まっている川渡りパズル
  |'weight-limited'             // 重量制限のある川渡りパズル
  |'predators-and-guardians'    // 敵と保護者がいる川渡りパズル
  |'escorting-celebrity'        // 要人を敵から保護する川渡りパズル
  |'keep-majority'              // 多数派を維持する川渡りパズル
  |'time-limited'               // 制限時間のある川渡りパズル

/**
 * パズルの特徴
 */
type Features = {
  night?: boolean
  island?: boolean
}

/**
 * シーンの説明
 */
interface Description {
  /** ステージのクリア条件 */
  conditions: string
  /** ステージに登場する乗り物の説明 */
  transportation: string
  /** ヒント */
  tips?: string[]
}

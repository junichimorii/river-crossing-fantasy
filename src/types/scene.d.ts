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
  /** 難易度 */
  level: number
  /** パズル種別 */
  category: Category
  /** パズルのルール */
  rules: Rules
  /** パズルの特徴 */
  landscape?: Features
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
  'unconditioned'             // 乗り物の定員以外の制限がない川渡りパズル
  |'conditioned'              // 簡単な条件のある川渡りパズル
  |'weight-limited'           // 重量制限のある川渡りパズル
  |'predators-and-guardians'  // 敵と保護者がいる川渡りパズル
  |'escorting-celebrity'      // 要人を敵から保護する川渡りパズル
  |'keep-majority'            // 多数派を維持する川渡りパズル
  |'time-limited'             // 制限時間のある川渡りパズル

/**
 * パズルの特徴
 */
type Features = {
  night?: boolean
  island?: boolean
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

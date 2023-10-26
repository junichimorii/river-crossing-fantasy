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
export interface Queue {
  /** 移動した登場人物 */
  casts: Cast[]
  /** 所要時間 */
  duration: number 
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

/**
 * 行動実績
 */
export type Activity =
  'swiped'              // 登場人物をスワイプした
  |'gotOn'              // 乗り物に乗った
  |'gotOff'             // 乗り物から降りた
  |'gotOnRower'         // 乗り物を操作できる登場人物が乗った
  |'left'               // 乗り物が出発した
  |'arrived'            // 乗り物が対岸に到着した
  |'gotOnFromOpposite'  // 向こう岸から乗り物に乗った
  |'completed'          // シーンをクリアに成功した
  |'failed'             // シーンのクリアに失敗した
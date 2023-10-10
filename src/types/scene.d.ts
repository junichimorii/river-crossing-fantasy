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
  /** ステージの合格基準となる回数または時間 */
  passing: number
  /** ステージの背景画像URL */
  landscape: string
  /** ステージに登場する乗り物 */
  carriers: Carrier[]
  /** ステージの登場人物 */
  casts: Cast[]
}

/** シーンの実績 */
export type Record = (
  'started'     // パズルを開始した
  |'swiped'     // 登場人物をスワイプした
  |'gotOn'      // 乗り物に乗った
  |'gotOnRower' // 乗り物を操作できる登場人物が乗った
  |'left'       // 乗り物が出発した
  |'arrived'    // 乗り物が対岸に到着した
  |'completed'  // パズルをクリアした
)

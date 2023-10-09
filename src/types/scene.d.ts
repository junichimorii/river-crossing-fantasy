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
  /** ステージの実績 */
  records: Set<SceneRecord>
  /** ステージに登場する乗り物 */
  carriers: Carrier[]
  /** ステージの登場人物 */
  casts: Cast[]
}
/** 実績 */
export type SceneRecord = (
  'started'     // パズルを開始した
  |'swiped'     // 登場人物をスワイプした
  |'gotOn'      // 乗り物に乗った
  |'gotOnRower' // 乗り物を操作できる登場人物が乗った
  |'leaved'     // 乗り物が出発した
  |'arrived'    // 乗り物が対岸に到着した
)

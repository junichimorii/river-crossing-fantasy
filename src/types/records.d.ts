/**
 * 川渡りパズルの実績
 */
export interface Records {
  /** クリアしたステージのID */
  stage: number
  /** パズルの実績 */
  records: Set<Record>
}
/** 実績 */
export type Record = (
  'started'     // 初めてパズルを開始した
  |'swiped'     // 初めて登場人物をスワイプした
  |'gotOn'      // 初めて乗り物に乗った
  |'gotOnRower' // 初めて乗り物を操作できる登場人物が乗った
  |'leaved'     // 初めて乗り物が出発した
  |'arrived'    // 初めて乗り物が対岸に到着した
)

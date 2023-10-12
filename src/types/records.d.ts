/**
 * 川渡りパズルの実績
 */
export interface Records {
  /** 攻略したシーン（ステージ）のID */
  scenes: Map<number, number>
  /** 実施したパズル種別 */
  categories: Set<Category>
  /** 実施した行動 */
  actions: Set<Action>
}
/** 種別 */
export type Category =
  'wolf-goat-and-cabbage'       // 敵と守護者がいる川渡りパズル
  |'missionaries-and-cannibals' // 多数派を維持する川渡りパズル
  |'bridge-and-torch'           // 制限時間のある川渡りパズル
  |'single-seated'  // 一人乗り
  |'double-seated'  // 二人乗り

  /** 行動実績 */
export type Action =
  'started'     // 初めてパズルを開始した
  |'swiped'     // 初めて登場人物をスワイプした
  |'gotOn'      // 初めて乗り物に乗った
  |'gotOnRower' // 初めて乗り物を操作できる登場人物が乗った
  |'left'       // 初めて乗り物が出発した
  |'arrived'    // 初めて乗り物が対岸に到着した
  |'completed'  // 初めてシーンをクリアした
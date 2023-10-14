/**
 * 川渡りパズルの実績
 */
export interface Records {
  /** 攻略したシーン（ステージ）のID */
  scenes: Map<number, number>
  /** 実施したパズル種別 */
  categories: Set<Category>
  /** 実施した行動 */
  activities: Set<Activity>
}
/** 種別 */
export type Category =
  'wolfGoatAndCabbage'        // 敵と守護者がいる川渡りパズル
  |'missionariesAndCannibals' // 多数派を維持する川渡りパズル
  |'bridgeAndTorch'           // 制限時間のある川渡りパズル
  |'singleSeated'  // 一人乗り
  |'doubleSeated'  // 二人乗り

  /** 行動実績 */
export type Activity =
  'started'             // 初めてパズルを開始した
  |'swiped'             // 初めて登場人物をスワイプした
  |'gotOn'              // 初めて乗り物に乗った
  |'gotOff'             // 初めて乗り物から降りた
  |'gotOnRower'         // 初めて乗り物を操作できる登場人物が乗った
  |'left'               // 初めて乗り物が出発した
  |'arrived'            // 初めて乗り物が対岸に到着した
  |'gotOnFromOpposite'  // 初めて向こう岸から乗り物に乗った
  |'completed'          // 初めてシーンをクリアした
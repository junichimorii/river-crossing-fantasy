/**
 * 川渡りパズルの実績
 */
export interface Records {
  /** クリアしたステージのID */
  stage: number
  /** 初めてパズルを開始した */
  started: boolean
  /** 初めて登場人物をスワイプした */
  swiped: boolean
  /** 初めて乗り物に乗った */
  gotOn: boolean
  /** 初めて乗り物を操作できる登場人物が乗った */
  gotOnRower: boolean
  /** 初めて乗り物が出発した */
  leaved: boolean
  /** 初めて乗り物が対岸に到着した */
  arrived: boolean
}
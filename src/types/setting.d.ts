// 川渡りパズルの全体設定
export interface Setting {
  scene: number
  records: {  // 実績
    started: boolean  // パズルを開始した
    swiped: boolean  // 登場人物をスワイプした
    gotOn: boolean  // 乗り物に乗った
    gotOnRower: boolean  // 乗り物を操作できる登場人物が乗った
    leaved: boolean  // 乗り物が出発した
    arrived: boolean  // 乗り物が対岸に到着した
  }
}
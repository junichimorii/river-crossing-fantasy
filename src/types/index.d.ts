// 川渡りパズルのステージ
export interface Stage {
  origin: Cast[]      // 出発地点のキャラクター
  destination: Cast[] // 到着地点のキャラクター
}

// 川渡りパズルの登場人物
export interface Cast {
  id: number
  isCrossed: boolean   // 対岸に渡った
  isCrossing: boolean  // 移動中
}

// 川渡りパズルの乗り物
export interface Carrier {
  capacity: number  // 定員
}

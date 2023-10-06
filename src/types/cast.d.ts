// 川渡りパズルの登場人物
export interface Cast {
  id: number
  avatar: string
  description: string
  role: Role
  status: Status
}
// 川渡りパズルの登場人物の役割
export interface Role {
  canRow: boolean     // 乗り物を操作できる
  enemies?: number[]  // 敵のID
  guardian?: number   // 守護者のID
  duration?: number   // 所要時間
}
// 川渡りパズルの登場人物の状態
export interface Status {
  disabled: boolean       // 操作が無効である
  isCrossed: boolean      // 開始地点の対岸にいる
  isSeated: boolean       // 乗り物の上にいる
  emotion: string | null  // 感情
}

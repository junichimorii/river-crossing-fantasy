/**
 * 行動履歴
 */
export interface Move {
  /** 移動した登場人物 */
  casts: Cast[]
  /** 所要時間 */
  value: number 
  /** 結果 */
  result?: string
}

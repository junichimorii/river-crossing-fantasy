import type { Bound } from '@/types/state'

/**
 * 行動履歴
 */
export interface Move {
  /** 移動した登場人物 */
  casts: Cast[]
  /** 行先 */
  bound: Bound
  /** 所要時間 */
  value: number
  /** 結果 */
  result?: string
}

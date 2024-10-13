import type { Bound } from '@/types'

/**
 * 行動履歴
 */
export interface Move {
  /** 移動した登場人物 */
  casts: Cast[]
  /** 進行方向 */
  bound: Bound
  /** 所要時間 */
  value: number
  /** 結果 */
  result?: string
}

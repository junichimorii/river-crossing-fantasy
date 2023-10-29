import type { Status } from '@/types/cast'

/**
 * 川渡りパズルの登場人物の初期ステータス
 */
const status: Status = Object.freeze({
  disabled: false,
  isCrossed: false,
  boarding: undefined,
  emotions: [],
})
export default status

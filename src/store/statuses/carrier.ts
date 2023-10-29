import type { Status } from '@/types/carrier'

/**
 * 川渡りパズルの乗り物の初期ステータス
 */
const status: Status = Object.freeze({
  isCrossed: false,
  isSailing: false,
})
export default status

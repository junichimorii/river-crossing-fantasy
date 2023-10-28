import { computed, Ref } from 'vue'
import type { Carrier, Status } from '@/types/carrier'

/**
 * 川渡りパズルの乗り物の初期ステータス
 */
export const defaultStatus: Status = Object.freeze({
  isCrossed: false,
  isSailing: false,
})

/**
 * 川渡りパズルの乗り物
 */
interface UseCarrierReturn {
  /** useTransitionで変化させるY座標 */
  y: Ref<number>
  /** 発進する */
  leave: () => Promise<void>
}
const useCarrier = (
  state: Carrier
): UseCarrierReturn => {
  const y = computed(() => state.status.isCrossed ? -1 : 0)
  const leave = async () => {
    state.status.isSailing = true
    state.status.isCrossed = !state.status.isCrossed
  }
  return {
    y,
    leave,
  }
}
export default useCarrier
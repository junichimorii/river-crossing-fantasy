// 川渡りパズルの乗り物
import { computed, ref, Ref } from 'vue'
import type { Carrier, Status } from '@/types/carrier'
import type { Cast } from '@/types/cast'
export const defaultStatus: Status = Object.freeze({
  isCrossed: false,
  passengers: [] as Cast[],
})
interface UseCarrierReturn {
  isBoardable: Ref<boolean>
  canLeave: Ref<boolean>
}
const useCarrier = (
  state: Carrier
): UseCarrierReturn => {
  // 乗り物がに空席があるどうか
  const isBoardable = computed(() => state.status.passengers.length < state.capacity)
  // 乗り物が出発できるか
  const canLeave = computed(() => state.status.passengers.some(cast => cast.role.canRow))
  return {
    isBoardable,
    canLeave,
  }
}
export default useCarrier
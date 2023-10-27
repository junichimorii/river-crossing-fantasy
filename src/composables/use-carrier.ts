import { computed, Ref } from 'vue'
import type { UseSwipeDirection } from '@vueuse/core'
import type { Carrier, Status } from '@/types/carrier'

/**
 * 川渡りパズルの乗り物の初期ステータス
 */
export const defaultStatus: Status = Object.freeze({
  isCrossed: false,
  isSailing: false,
  passengers: [] as number[],
})

/**
 * 川渡りパズルの乗り物
 */
interface UseCarrierReturn {
  /** useTransitionで変化させるY座標 */
  y: Ref<number>
  /** 乗客を乗せる */
  pickUp: (castId: number) => Promise<void>
  /** 乗客を降ろす */
  dropOff: (castId: number) => Promise<void>
  /** 発進する */
  leave: () => Promise<void>
  /** 到着する */
  arrive: () => Promise<void>
}
const useCarrier = (
  state: Carrier
): UseCarrierReturn => {
  const y = computed(() => state.status.isCrossed ? -1 : 0)
  const pickUp = async (
    castId: number
  ) => {
    state.status.passengers.push(castId)
  }
  const dropOff = async (
    castId: number
  ) => {
    state.status.passengers = state.status.passengers.filter(passengerId => passengerId !== castId)
  }
  const leave = async () => {
    state.status.isSailing = true
    state.status.isCrossed = !state.status.isCrossed
  }
  const arrive = async () => {
    state.status.isSailing = false
  }
  return {
    y,
    pickUp,
    dropOff,
    leave,
    arrive,
  }
}
export default useCarrier
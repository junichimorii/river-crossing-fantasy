import { computed, Ref } from 'vue'
import type { Carrier, Status } from '@/types/carrier'
import type { Cast } from '@/types/cast'
/**
 * 川渡りパズルの乗り物の初期ステータス
 */
export const defaultStatus: Status = Object.freeze({
  isCrossed: false,
  isSailing: false,
  passengers: [] as Cast[],
})
/**
 * 川渡りパズルの乗り物
 */
interface UseCarrierReturn {
  /** useTransitionで変化させるY座標 */
  y: Ref<number>
  /** 空席がある */
  isVacancy: Ref<boolean>
  /** 重量オーバーである */
  isOverweight: Ref<boolean>
  /** 乗り物が利用可能 */
  isAvailable: Ref<boolean>
  /** 乗り物を操作可能 */
  isOperable: Ref<boolean>
  /** 乗り物が出発可能 */
  isReady: Ref<boolean>
  /** 上方向に移動可能 */
  upbound: Ref<boolean>
  /** 下方向に移動可能 */
  downbound: Ref<boolean>
  /** 移動速度 */
  duration: Ref<number>
  /** 乗客を乗せる */
  pickUp: (cast: Cast) => Promise<void>
  /** 乗客を降ろす */
  dropOff: (cast: Cast) => Promise<void>
  /** 発進する */
  leave: () => Promise<void>
  /** 到着する */
  arrive: () => Promise<void>
}
const useCarrier = (
  state: Carrier
): UseCarrierReturn => {
  const y = computed(() => state.status.isCrossed ? -1 : 0)
  const isVacancy = computed(() => state.status.passengers.length < state.capacity)
  const isOverweight = computed(() => state.weightLimit !== undefined
    && state.status.passengers.reduce((a, b) => a + (b.role.weight ? b.role.weight : 0), 0) > state.weightLimit
  )
  const isAvailable = computed(() => isVacancy.value && !isOverweight.value)
  const isOperable = computed(() => state.status.passengers.some(cast => cast.role.canRow === undefined || cast.role.canRow))
  const isReady = computed(() => !state.status.isSailing && isOperable.value && !isOverweight.value)
  const upbound = computed(() => isReady.value && !state.status.isCrossed)
  const downbound = computed(() => isReady.value && state.status.isCrossed)
  const duration = computed(() => Math.max(...state.status.passengers.map(cast => cast.role.duration || 1)))
  const pickUp = async (
    cast: Cast
  ) => {
    state.status.passengers.push(cast)
  }
  const dropOff = async (
    cast: Cast
  ) => {
    state.status.passengers = state.status.passengers.filter(passenger => passenger.id !== cast.id)
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
    isVacancy,
    isOverweight,
    isAvailable,
    isOperable,
    isReady,
    duration,
    upbound,
    downbound,
    pickUp,
    dropOff,
    leave,
    arrive,
  }
}
export default useCarrier
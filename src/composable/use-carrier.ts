// 川渡りパズルの乗り物
import { computed, ref, Ref } from 'vue'
import type { Carrier, Status } from '@/types/carrier'
import type { Cast } from '@/types/cast'
export const defaultStatus: Status = Object.freeze({
  isCrossed: false,
  isSailing: false,
  passengers: [] as Cast[],
})
interface UseCarrierReturn {
  source: Ref<number>
  isBoardable: Ref<boolean>
  canLeave: Ref<boolean>
  isUpbound: Ref<boolean>
  isDownbound: Ref<boolean>
init: () => Promise<void>
  pickUp: (cast: Cast) => Promise<void>
  dropOff: (cast: Cast) => Promise<void>
  leave: () => Promise<void>
  arrive: () => Promise<void>
}
const useCarrier = (
  state: Carrier
): UseCarrierReturn => {
  /**
   * useTransitionで変化させる数値
   */
  const source = ref(0)
  /**
   * 乗り物に空席があるどうか
   */
  const isBoardable = computed(() => state.status.passengers.length < state.capacity)
  // 
  /**
   * 乗り物が出発できるかどうか（乗り物を操作できる人物が乗っており、乗り物が進行中でない）
   */
  const canLeave = computed(() => !state.status.isSailing && state.status.passengers.some(cast => cast.role.canRow))
  /**
   * 乗り物の行先が上方向かどうか
   */
  const isUpbound = computed(() => !state.status.isCrossed)
  /**
   * 乗り物の行先が下方向かどうか
   */
  const isDownbound = computed(() => state.status.isCrossed)
  /**
   * 初期化
   */
  const init = async () => {
    console.log(`useCarrier: init carrier ${state.id}`)
    Object.assign(state.status, {...defaultStatus})
    source.value = 0
  }
  /**
   * 乗客を乗せる
   */
  const pickUp = async (
    cast: Cast
  ) => {
    console.log(`useCarrier: pickUp cast ${cast.id}`)
    state.status.passengers.push(cast)
  }
  /**
   * 乗客を降ろす
   */
  const dropOff = async (
    cast: Cast
  ) => {
    console.log(`useCarrier: dropOff cast ${cast.id}`)
    state.status.passengers = state.status.passengers.filter(passenger => passenger.id !== cast.id)
  }
  /**
   * 発進する
   */
  const leave = async () => {
    console.log(`useCarrier: leave carrier ${state.id}`)
    state.status.isSailing = true
    source.value = source.value === 0 ? -1 : 0
  }
  /**
   * 到着する
   */
  const arrive = async () => {
    console.log(`useCarrier: arrive carrier ${state.id}`)
    state.status.isSailing = false
    state.status.isCrossed = !state.status.isCrossed
  }
  return {
    source,
    isBoardable,
    canLeave,
    isUpbound,
    isDownbound,
    init,
    pickUp,
    dropOff,
    leave,
    arrive,
  }
}
export default useCarrier
import type { Ref } from 'vue'
import type { Carrier, State } from '@/types'
import type { CarrierState, Bound } from '@/types/state'
export const carrierState: CarrierState = Object.freeze({
  coord: -1,
  bound: null
})

/**
 * 川渡りパズルの乗り物の状態管理
 */
const useCarrierState = (
  state: Ref<State>,
) => {

  /**
   * 乗り物の座標
   */
  const coord = (
    carrier: Carrier
  ) => state.value.carriers[carrier.id].coord

  /**
   * 乗り物の行先
   */
  const bound = (
    carrier: Carrier
  ) => state.value.carriers[carrier.id].bound

  /**
   * 乗り物が出発する
   * TODO: 中州がある場合の分岐
   */
  const leave = async (
    carrier: Carrier,
    bound: Bound,
  ) => {
    state.value.carriers[carrier.id].bound = bound
    state.value.carriers[carrier.id].coord = -(state.value.carriers[carrier.id].coord)
  }

  /**
   * 乗り物が到着する
   * TODO: 中州がある場合の分岐
   */
  const arrive = async (
    carrier: Carrier,
  ) => {
    state.value.carriers[carrier.id].bound = null
  }

  return {
    coord,
    bound,
    leave,
    arrive,
  }
}
export default useCarrierState
export type UseCarrierStateReturn = ReturnType<typeof useCarrierState>
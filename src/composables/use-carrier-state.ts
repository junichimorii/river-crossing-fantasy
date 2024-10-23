import type { Carrier, CarrierState, State } from '@/types'
export const defaultState: CarrierState = Object.freeze({
  coord: -1,
})

/**
 * 川渡りパズルの乗り物の状態管理
 */
const useCarrierState = (
  state: Ref<State>,
) => {

  /** 乗り物の座標 */
  const coord = (
    carrier: Carrier
  ) => state.value.carriers[carrier.id].coord

  /** 乗り物が出発する */
  const leave = async (
    carrier: Carrier,
    destination: number,
  ) => {
    state.value.carriers[carrier.id].coord = destination
  }

  return {
    coord,
    leave,
  }
}
export default useCarrierState
export type UseCarrierStateReturn = ReturnType<typeof useCarrierState>

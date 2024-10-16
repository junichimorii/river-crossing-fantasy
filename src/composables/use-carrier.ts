import { useCarrierState, useCast, useCastState } from '@/composables'
import type { Bound, Carrier, Cast, Scene, State } from '@/types'

/**
 * 川渡りパズルの乗り物
 */
const useCarrier = (
  state: Ref<State>,
  scene: Ref<Scene>,
) => {
  const { coord } = useCarrierState(state)
  const { boarding, diseased } = useCastState(state)
  const { isRower, getWeight, getDuration } = useCast()

  /** 乗り物に乗っている登場人物 */
  const getPassengers = (
    carrier: Carrier
  ) => scene.value.casts.filter(cast => boarding(cast) === carrier.id)

  /** 対岸までの所要時間を算出 */
  const getElapsedTime = (
    carrier: Carrier
  ) => getPassengers(carrier).length > 0
    ? Math.max(...getPassengers(carrier).map(cast => getDuration(cast)))
    : 1

  /** 積載重量を算出 */
  const getLoad = (
    carrier: Carrier
  ) => getPassengers(carrier).reduce((weight, cast) => weight + getWeight(cast), 0)

  /** 乗り物の行先を算出 */
  const getDestination = (
    carrier: Carrier,
    bound: Bound,
  ) => scene.value.landscape?.island
    ? coord(carrier) === 0
      ? bound === 'inbound'
        ? 1
        : -1
      : 0
    : -coord(carrier)

  /** 乗員がいるかどうか */
  const hasPassengers = (
    carrier: Carrier
  ) => getPassengers(carrier).length > 0

  /** 空席があるかどうか */
  const isVacancy = (
    carrier: Carrier,
    cast: Cast,
  ) => (getLoad(carrier) + getWeight(cast)) <= carrier.capacity

  /** 操作可能かどうか */
  const isOperable = (
    carrier: Carrier
  ) => (
    // 筏を漕げる乗員がおり、かつ状態異常でない
    getPassengers(carrier).some(cast => isRower(cast) && !diseased(cast))
    ||
    // 筏を漕げる乗員がおり、かつ聖女も同乗している
    (getPassengers(carrier).some(cast => isRower(cast)) && getPassengers(carrier).some(cast => cast.role.saint))
  ) && getLoad(carrier) <= carrier.capacity

  return {
    getElapsedTime,
    getLoad,
    getDestination,
    hasPassengers,
    isVacancy,
    isOperable,
  }
}
export default useCarrier
export type UseCarrierReturn = ReturnType<typeof useCarrier>

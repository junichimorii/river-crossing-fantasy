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

  /** 乗り物に乗っている登場人物 */
  const getPassengers = (
    carrier: Carrier
  ) => scene.value.casts.filter(cast => boarding(cast) === carrier.id)

  /** 乗り物に乗っている筏を漕げる登場人物 */
  const getRowers = (
    carrier: Carrier
  ) => getPassengers(carrier).filter(cast =>
    // 聖女が同乗しているか
    getPassengers(carrier).some(cast => cast.role.saint)
      // 聖女が同乗している場合、筏を漕げる人物全員
      ? isRower(cast)
      // 聖女が同乗していない場合、筏を漕げる状態異常でない人物全員
      : isRower(cast) && !diseased(cast)
  )

  /** 乗員がいるかどうか */
  const hasPassengers = (
    carrier: Carrier
  ) => getPassengers(carrier).length > 0

  /** 操作可能かどうか */
  const isOperable = (
    carrier: Carrier
  ) => getRowers(carrier).length > 0 && getLoad(carrier) <= carrier.capacity

  /** 空席があるかどうか */
  const isVacancy = (
    carrier: Carrier,
    cast: Cast,
  ) => (getLoad(carrier) + getWeight(cast)) <= carrier.capacity

  return {
    getDestination,
    getElapsedTime,
    getLoad,
    hasPassengers,
    isOperable,
    isVacancy,
  }
}
export default useCarrier
export type UseCarrierReturn = ReturnType<typeof useCarrier>

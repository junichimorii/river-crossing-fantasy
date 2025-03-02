import { useCarrierState, useCrew, useCrewState } from '@/composables'
import type { Bound, Carrier, Crew, Scene, State } from '@/types'

/**
 * 川渡りパズルの乗り物
 */
const useCarrier = (
  state: Ref<State>,
  scene: Ref<Scene>,
) => {
  const { coord } = useCarrierState(state)
  const { boarding, diseased } = useCrewState(state)
  const { isRower, getWeight, getDuration } = useCrew()

  /** 乗り物の行先を算出 */
  const getDestination = (
    carrier: Carrier,
    bound?: Bound,
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
    ? Math.max(...getPassengers(carrier).map(crew => getDuration(crew)))
    : 1

  /** 積載重量を算出 */
  const getLoad = (
    carrier: Carrier
  ) => getPassengers(carrier).reduce((weight, crew) => weight + getWeight(crew), 0)

  /** 乗り物に乗っている登場人物 */
  const getPassengers = (
    carrier: Carrier
  ) => scene.value.crews.filter(crew => boarding(crew) === carrier.id)

  /** 乗り物に乗っている筏を漕げる登場人物 */
  const getRowers = (
    carrier: Carrier
  ) => getPassengers(carrier).filter(crew =>
    // 聖女が同乗しているか
    getPassengers(carrier).some(crew => crew.role.saint)
      // 聖女が同乗している場合、筏を漕げる人物全員
      ? isRower(crew)
      // 聖女が同乗していない場合、筏を漕げる状態異常でない人物全員
      : isRower(crew) && !diseased(crew)
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
    crew: Crew,
  ) => (getLoad(carrier) + getWeight(crew)) <= carrier.capacity

  return {
    getDestination,
    getElapsedTime,
    getLoad,
    getPassengers,
    getRowers,
    hasPassengers,
    isOperable,
    isVacancy,
  }
}
export default useCarrier
export type UseCarrierReturn = ReturnType<typeof useCarrier>

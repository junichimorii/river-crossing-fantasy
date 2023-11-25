import type { Carrier, Scene, State } from '@/types'
import type { Bound } from '@/types/state'
import type { Ref } from 'vue'
import { useCarrierState, useCastState } from '@/composables'

/**
 * 川渡りパズルの乗り物
 */
const useCarrier = (
  state: Ref<State>,
  scene: Ref<Scene>,
) => {
  const { coord } = useCarrierState(state)
  const { boarding } = useCastState(state)

  /**
   * 対岸までの所要時間を算出
   */
  const getDuration = (
    carrier: Carrier
  ) => getPassengers(carrier).length > 0
    ? Math.max(...getPassengers(carrier).map(cast => cast.role.duration || 1))
    : 1

  /**
   * 乗り物の行先を算出
   */
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

  /**
   * 乗員がいるかどうか
   */
  const hasPassengers = (
    carrier: Carrier
  ) => getPassengers(carrier).length > 0

  /**
   * 空席があるかどうか
   */
  const isVacancy = (
    carrier: Carrier
  ) => getPassengers(carrier).length < carrier.capacity

  /**
   * 操作可能かどうか
   */
  const isOperable = (
    carrier: Carrier
  ) => getPassengers(carrier).some(cast => cast.role.rower === undefined || cast.role.rower)

  /**
   * 乗り物に乗っている登場人物
   */
  const getPassengers = (
    carrier: Carrier
  ) => scene.value.casts.filter(cast => boarding(cast) === carrier.id)

  return {
    getDuration,
    getDestination,
    hasPassengers,
    isVacancy,
    isOperable,
  }
}
export default useCarrier
export type UseCarrierReturn = ReturnType<typeof useCarrier>
import { useCarrierState, useCastState } from '@/composables'
import type { Ref } from 'vue'
import type { Carrier, Scene, State } from '@/types'
import type { Bound } from '@/types/state'

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
   * 積載重量を算出
   */
  const getLoad = (
    carrier: Carrier
  ) => getPassengers(carrier).reduce((weight, cast) => weight + (cast.role.weight ? cast.role.weight : 0), 0)

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
   * 最大積載重量未満かどうか
   */
  const isUnderweight = (
    carrier: Carrier
  ) => carrier.weightLimit === undefined || getLoad(carrier) <= carrier.weightLimit

  /**
   * 操作可能かどうか
   */
  const isOperable = (
    carrier: Carrier
  ) => getPassengers(carrier).some(cast => cast.role.rower === undefined || cast.role.rower)

  /**
   * 利用可能かどうか
   */
  const isAvailable = (
    carrier: Carrier
  ) => isVacancy(carrier) && isUnderweight(carrier)

  /**
   * 出発可能かどうか
   */
  const isReady = (
    carrier: Carrier
  ) => isOperable(carrier) && isUnderweight(carrier)

  /**
   * 乗り物に乗っている登場人物
   */
  const getPassengers = (
    carrier: Carrier
  ) => scene.value.casts.filter(cast => boarding(cast) === carrier.id)

  return {
    getDuration,
    getLoad,
    getDestination,
    hasPassengers,
    isAvailable,
    isReady,
  }
}
export default useCarrier
export type UseCarrierReturn = ReturnType<typeof useCarrier>
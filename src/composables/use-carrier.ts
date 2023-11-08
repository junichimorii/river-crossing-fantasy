import type { Ref } from 'vue'
import type { Carrier, Scene, State } from '@/types'

/**
 * 川渡りパズルの乗り物
 */
const useCarrier = (
  state: Ref<State>,
  scene: Ref<Scene>,
) => {
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
  ) => getPassengers(carrier).some(cast => cast.role.canRow === undefined || cast.role.canRow)

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
  ) => scene.value.casts.filter((cast, i) => state.value.casts[i].boarding === carrier.id)

  return {
    getDuration,
    getLoad,
    hasPassengers,
    isAvailable,
    isReady,
  }
}
export default useCarrier
export type UseCarrierReturn = ReturnType<typeof useCarrier>
import { useCarrierState, useCastState } from '@/composables'
import type { Scene, State } from '@/types'

/**
 * 大工が登場する（乗り物の耐久性がある）川渡りパズルの成否判定
 */
const useSceneRepairers = (
  state: Ref<State>,
  scene: Ref<Scene>,
) => {
  const { coord: carrierCoord } = useCarrierState(state)
  const { coord: castCoord, feel } = useCastState(state)

  /** 乗り物の耐久性があるパズルかどうか */
  const isValid = scene.value.casts.some(cast => cast.role.repairer)

  /** 乗り物が壊れないか判定する */
  const test = async () => {
    const repairers = scene.value.casts.filter(cast => cast.role.repairer)
    const others = scene.value.casts.filter(cast => !cast.role.repairer)
    const isRepaired = scene.value.carriers.every(carrier =>
      repairers.some(repairer => carrierCoord(carrier) === castCoord(repairer))
    )
    if (isRepaired) return
    for (const cast of repairers) feel(cast, 'surprised')
    for (const cast of others) feel(cast, 'scared')
  }

  return {
    isValid,
    test,
  }
}
export default useSceneRepairers
export type UseSceneRepairersReturn = ReturnType<typeof useSceneRepairers>

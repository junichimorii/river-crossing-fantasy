import { useCarrierState, useCrewState } from '@/composables'
import type { Scene, State } from '@/types'

/**
 * 大工が登場する（乗り物の耐久性がある）川渡りパズルの成否判定
 */
const useSceneRepairers = (
  state: Ref<State>,
  scene: Ref<Scene>,
) => {
  const { coord: carrierCoord } = useCarrierState(state)
  const { coord: crewCoord, feel } = useCrewState(state)

  /** 乗り物の耐久性があるパズルかどうか */
  const isValid = scene.value.crews.some(crew => crew.role.repairer)

  /** 乗り物が壊れないか判定する */
  const test = async () => {
    const repairers = scene.value.crews.filter(crew => crew.role.repairer)
    const others = scene.value.crews.filter(crew => !crew.role.repairer)
    const isRepaired = scene.value.carriers.every(carrier =>
      repairers.some(repairer => carrierCoord(carrier) === crewCoord(repairer))
    )
    if (isRepaired) return
    for (const crew of repairers) feel(crew, 'surprised')
    for (const crew of others) feel(crew, 'scared')
  }

  return {
    isValid,
    test,
  }
}
export default useSceneRepairers
export type UseSceneRepairersReturn = ReturnType<typeof useSceneRepairers>

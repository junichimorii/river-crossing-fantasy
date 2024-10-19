import { useCastState } from '@/composables'
import type { Scene, State } from '@/types'

/**
 * 敵と保護者が登場する川渡りパズルの成否判定
 */
const useScenePredators = (
  state: Ref<State>,
  scene: Ref<Scene>,
) => {
  const { feel, isNeighboring } = useCastState(state)

  /** 敵と保護者が登場するパズルかどうか */
  const isValid = scene.value.casts.some(cast => cast.role.predators)

  /** 敵の捕食が成功したかどうか判定する */
  const test = async () => {
    for await (const myself of scene.value.casts) {
      if (!myself.role.predators) continue
      for await (const my of myself.role.predators) {
        const predator = scene.value.casts[my.predator]
        // 敵と隣接している
        if (isNeighboring(myself, predator)) {
          const guardian = scene.value.casts[my.guardian]
          // 保護者が近くにいない
          if (!isNeighboring(myself, guardian)) {
            feel(myself, 'scared')
            feel(predator, 'excited')
            feel(guardian, 'surprised')
          }
        }
      }
    }
  }

  return {
    isValid,
    test,
  }
}
export default useScenePredators
export type UseScenePredatorsReturn = ReturnType<typeof useScenePredators>

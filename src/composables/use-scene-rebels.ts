import { useCastState, useCasts } from '@/composables'
import type { Scene, State } from '@/types'

/**
 * 半数以上を維持する川渡りパズルの成否判定
 */
const useSceneRebels = (
  state: Ref<State>,
  scene: Ref<Scene>,
) => {
  const { feel } = useCastState(state)
  const { groups } = useCasts(state, scene)

  /** 半数以上を維持するパズルかどうか */
  const isValid = scene.value.casts.some(cast => cast.role.rebel)

  /** 反乱が成功したかどうか判定する */
  const test = async () => {
    for await (const casts of groups.value) {
      const missionaries = casts.filter(cast => !cast.role.rebel)
      if (missionaries.length === 0) continue
      const cannibals = casts.filter(cast => cast.role.rebel)
      if (cannibals.length === 0) continue
      if (missionaries.length < cannibals.length) {
        for (const cast of missionaries) feel(cast, 'scared')
        for (const cast of cannibals) feel(cast, 'excited')
      }
    }
    const missionaries = scene.value.casts.filter(cast => !cast.role.rebel)
    if (missionaries.some(cast => state.value.casts[cast.id].emotions.length > 0)) {
      for await (const cast of missionaries) {
        if (state.value.casts[cast.id].emotions.length === 0) {
          feel(cast, 'surprised')
        }
      }
    }
  }

  return {
    isValid,
    test,
  }
}
export default useSceneRebels
export type UseSceneRebelsReturn = ReturnType<typeof useSceneRebels>

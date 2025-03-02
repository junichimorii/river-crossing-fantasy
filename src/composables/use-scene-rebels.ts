import { useCrewState, useCrews } from '@/composables'
import type { Scene, State } from '@/types'

/**
 * 半数以上を維持する川渡りパズルの成否判定
 */
const useSceneRebels = (
  state: Ref<State>,
  scene: Ref<Scene>,
) => {
  const { feel } = useCrewState(state)
  const { groups } = useCrews(state, scene)

  /** 半数以上を維持するパズルかどうか */
  const isValid = scene.value.crews.some(crew => crew.role.rebel)

  /** 反乱が成功したかどうか判定する */
  const test = async () => {
    for await (const crews of groups.value) {
      const missionaries = crews.filter(crew => !crew.role.rebel)
      if (missionaries.length === 0) continue
      const cannibals = crews.filter(crew => crew.role.rebel)
      if (cannibals.length === 0) continue
      if (missionaries.length < cannibals.length) {
        for (const crew of missionaries) feel(crew, 'scared')
        for (const crew of cannibals) feel(crew, 'excited')
      }
    }
    const missionaries = scene.value.crews.filter(crew => !crew.role.rebel)
    if (missionaries.some(crew => state.value.crews[crew.id].emotions.length > 0)) {
      for await (const crew of missionaries) {
        if (state.value.crews[crew.id].emotions.length === 0) {
          feel(crew, 'surprised')
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

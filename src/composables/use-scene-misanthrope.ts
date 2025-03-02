import { useCrewState } from '@/composables'
import type { Scene, State } from '@/types'

/**
 * 人間嫌いが登場するパズルの成否判定
 */
const useSceneMisanthrope = (
  state: Ref<State>,
  scene: Ref<Scene>,
) => {
  const { boarding, feel, isNeighboring } = useCrewState(state)

  /** 人間嫌いが登場するかどうか */
  const isValid = scene.value.crews.some(crew => crew.role.misanthrope)

  /** 人間と同乗しているかどうか判定する */
  const test = async () => {
    // 人間（亜人以外）
    const humans = scene.value.crews.filter(crew => !crew.role.demihuman)
    for await (const myself of scene.value.crews) {
      if (!myself.role.misanthrope) continue
      if (boarding(myself) === null) continue
      for await (const human of humans) {
        // 嫌悪対象と隣接している
        if (isNeighboring(myself, human)) {
          feel(myself, 'surprised')
        }
      }
    }
  }

  return {
    isValid,
    test,
  }
}
export default useSceneMisanthrope
export type UseSceneMisanthropeReturn = ReturnType<typeof useSceneMisanthrope>

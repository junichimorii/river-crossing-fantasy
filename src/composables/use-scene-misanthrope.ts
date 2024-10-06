import { useCastState } from '@/composables'
import type { Scene, State } from '@/types'

/**
 * エルフ（人間嫌い）が登場するパズルの成否判定
 */
const useSceneMisanthrope = (
  state: Ref<State>,
  scene: Ref<Scene>,
) => {
  const { boarding, feel, isNeighboring } = useCastState(state)

  /** エルフ（人間嫌い）が登場するかどうか */
  const isValid = scene.value.casts.some(cast => cast.role.misanthrope)

  /** エルフが人間と同乗しているかどうか判定する */
  const test = async () => {
    // 人間（亜人以外）
    const humans = scene.value.casts.filter(cast => !cast.role.demihuman)
    for await (const myself of scene.value.casts) {
      if (!myself.role.misanthrope) continue
      if (boarding(myself) === null) continue
      for await (const human of humans) {
        // 嫌悪対象と隣接している
        if (isNeighboring(myself, human)) {
          // 感情を追加
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
import { useCastState } from '@/composables'
import type { Scene, State } from '@/types'

/**
 * 孤独嫌いが登場する川渡りパズルの成否判定
 */
const useSceneMonophobia = (
  state: Ref<State>,
  scene: Ref<Scene>,
) => {
  const { coord: castCoord, boarding, feel } = useCastState(state)

  /** 孤独嫌いが登場するかどうか */
  const isValid = scene.value.casts.some(cast => cast.role.monophobia)

  /** 独りぼっちかどうか判定する */
  const test = async () => {
    for await (const myself of scene.value.casts) {
      if (!myself.role.monophobia) continue
      const others = scene.value.casts.filter(cast => cast !== myself)
      // 乗り物に乗っている
      if (boarding(myself) !== null) {
        if (!others.some(cast => boarding(myself) === boarding(cast))) {
          feel(myself, 'scared')
          for await (const cast of others) {
            feel(cast, 'surprised')
          }
        }
      // 乗り物に乗っていない
      } else {
        if (others.filter(cast => boarding(cast) === null && castCoord(myself) === castCoord(cast)).length === 0) {
          feel(myself, 'scared')
          for await (const cast of others) {
            feel(cast, 'surprised')
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
export default useSceneMonophobia
export type UseSceneMonophobiaReturn = ReturnType<typeof useSceneMonophobia>

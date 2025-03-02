import { useCrewState } from '@/composables'
import type { Scene, State } from '@/types'

/**
 * 孤独嫌いが登場する川渡りパズルの成否判定
 */
const useSceneMonophobia = (
  state: Ref<State>,
  scene: Ref<Scene>,
) => {
  const { coord: crewCoord, boarding, feel } = useCrewState(state)

  /** 孤独嫌いが登場するかどうか */
  const isValid = scene.value.crews.some(crew => crew.role.monophobia)

  /** 独りぼっちかどうか判定する */
  const test = async () => {
    for await (const myself of scene.value.crews) {
      if (!myself.role.monophobia) continue
      const others = scene.value.crews.filter(crew => crew !== myself)
      // 乗り物に乗っている
      if (boarding(myself) !== null) {
        if (!others.some(crew => boarding(myself) === boarding(crew))) {
          feel(myself, 'scared')
          for await (const crew of others) {
            feel(crew, 'surprised')
          }
        }
      // 乗り物に乗っていない
      } else {
        if (others.filter(crew => boarding(crew) === null && crewCoord(myself) === crewCoord(crew)).length === 0) {
          feel(myself, 'scared')
          for await (const crew of others) {
            feel(crew, 'surprised')
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

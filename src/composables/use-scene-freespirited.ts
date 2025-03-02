import { useCrews, useCrewState } from '@/composables'
import type { Scene, State } from '@/types'

/**
 * 道化師（自由奔放）が登場する川渡りパズルの成否判定
 */
const useSceneFreespirited = (
  state: Ref<State>,
  scene: Ref<Scene>,
) => {
  const { feel } = useCrewState(state)
  const { groups } = useCrews(state, scene)

  /** 道化師（自由奔放）が登場するかどうか */
  const isValid = scene.value.crews.some(crew => crew.role.freespirited)

  /** 道化師（自由奔放）が単独行動できるかどうか判定する */
  const test = async () => {
    const parties = scene.value.crews.filter(crew => crew.role.freespirited)
    const others = scene.value.crews.filter(crew => !crew.role.freespirited)
    for await (const crews of groups.value) {
      // 同一地点に道化師しかいない
      if (crews.length > 0 && crews.every(crew => crew.role.freespirited)) {
        for await (const crew of parties) {
          feel(crew, 'excited')
        }
        for await (const crew of others) {
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
export default useSceneFreespirited
export type UseSceneFreespiritedReturn = ReturnType<typeof useSceneFreespirited>

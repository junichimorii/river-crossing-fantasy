import { useCasts, useCastState } from '@/composables'
import type { Scene, State } from '@/types'

/**
 * 道化師（自由奔放）が登場する川渡りパズルの成否判定
 */
const useSceneFreespirited = (
  state: Ref<State>,
  scene: Ref<Scene>,
) => {
  const { feel } = useCastState(state)
  const { groups } = useCasts(state, scene)

  /** 道化師（自由奔放）が登場するかどうか */
  const isValid = scene.value.casts.some(cast => cast.role.freespirited)

  /** 道化師（自由奔放）が単独行動できるかどうか判定する */
  const test = async () => {
    const parties = scene.value.casts.filter(cast => cast.role.freespirited)
    const others = scene.value.casts.filter(cast => !cast.role.freespirited)
    for await (const casts of groups.value) {
      // 同一地点に道化師しかいない
      if (casts.length > 0 && casts.every(cast => cast.role.freespirited)) {
        for await (const cast of parties) {
          feel(cast, 'excited')
        }
        for await (const cast of others) {
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
export default useSceneFreespirited
export type UseSceneFreespiritedReturn = ReturnType<typeof useSceneFreespirited>

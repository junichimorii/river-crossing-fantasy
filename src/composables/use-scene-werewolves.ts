import { useCastState, useCasts } from '@/composables'
import type { Scene, State } from '@/types'

/**
 * 人狼が登場する川渡りパズルの成否判定
 */
const useSceneWerewolves = (
  state: Ref<State>,
  scene: Ref<Scene>,
) => {
  const { feel } = useCastState(state)
  const { groups } = useCasts(state, scene)

  /** 人狼が登場するパズルかどうか */
  const isValid = scene.value.casts.some(cast => cast.role.werewolf)

  /** 人狼による襲撃が成功したかどうか判定する */
  const test = async () => {
    for await (const casts of groups.value) {
      const villagers = casts.filter(cast => !cast.role.werewolf)
      if (villagers.length === 0) continue
      const werewolves = casts.filter(cast => cast.role.werewolf)
      if (werewolves.length === 0) continue
      if (villagers.length <= werewolves.length) {
        for (const cast of villagers) feel(cast, 'scared')
        for (const cast of werewolves) feel(cast, 'excited')
      }
    }
    const villagers = scene.value.casts.filter(cast => !cast.role.werewolf)
    if (villagers.some(cast => state.value.casts[cast.id].emotions.length > 0)) {
      for await (const cast of villagers) {
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
export default useSceneWerewolves
export type UseSceneWerewolvesReturn = ReturnType<typeof useSceneWerewolves>

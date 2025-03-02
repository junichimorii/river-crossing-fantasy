import { useCrewState, useCrews } from '@/composables'
import type { Scene, State } from '@/types'

/**
 * 人狼が登場する川渡りパズルの成否判定
 */
const useSceneWerewolves = (
  state: Ref<State>,
  scene: Ref<Scene>,
) => {
  const { feel } = useCrewState(state)
  const { groups } = useCrews(state, scene)

  /** 人狼が登場するパズルかどうか */
  const isValid = scene.value.crews.some(crew => crew.role.werewolf)

  /** 人狼による襲撃が成功したかどうか判定する */
  const test = async () => {
    for await (const crews of groups.value) {
      const villagers = crews.filter(crew => !crew.role.werewolf)
      if (villagers.length === 0) continue
      const werewolves = crews.filter(crew => crew.role.werewolf)
      if (werewolves.length === 0) continue
      if (villagers.length <= werewolves.length) {
        for (const crew of villagers) feel(crew, 'scared')
        for (const crew of werewolves) feel(crew, 'excited')
      }
    }
    const villagers = scene.value.crews.filter(crew => !crew.role.werewolf)
    if (villagers.some(crew => state.value.crews[crew.id].emotions.length > 0)) {
      for await (const crew of villagers) {
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
export default useSceneWerewolves
export type UseSceneWerewolvesReturn = ReturnType<typeof useSceneWerewolves>

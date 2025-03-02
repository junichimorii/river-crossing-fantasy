import { useCrewState, useCrews } from '@/composables'
import type { Scene, State } from '@/types'

/**
 * 不仲な者達が登場する川渡りパズルの成否判定
 */
const useSceneDiscord = (
  state: Ref<State>,
  scene: Ref<Scene>,
) => {
  const { feel, isNeighboring } = useCrewState(state)
  const { groups } = useCrews(state, scene)

  /** 不仲な者達が登場するパズルかどうか */
  const isValid = scene.value.crews.some(crew => crew.role.discord)

  /** 不仲の対象と二人きりかどうか判定する */
  const test = async () => {
    for await (const crews of groups.value) {
      /** 各地点において二人きりでない場合は判定しない */
      if (crews.length !== 2) continue
      for await (const myself of crews) {
        if (!myself.role.discord) continue
        for await (const discordId of myself.role.discord) {
          const discord = scene.value.crews[discordId]
          // 不仲な者と隣接している
          if (isNeighboring(myself, discord)) {
            feel(myself, 'excited')
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
export default useSceneDiscord
export type UseSceneDiscordReturn = ReturnType<typeof useSceneDiscord>

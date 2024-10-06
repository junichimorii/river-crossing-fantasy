import { useCastState, useCasts } from '@/composables'
import type { Scene, State } from '@/types'

/**
 * 不仲な者達が登場する川渡りパズルの成否判定
 */
const useSceneDiscord = (
  state: Ref<State>,
  scene: Ref<Scene>,
) => {
  const { feel, isNeighboring } = useCastState(state)
  const { groups } = useCasts(state, scene)

  /** 不仲な者達が登場するパズルかどうか */
  const isValid = scene.value.casts.some(cast => cast.role.discord)

  /** 不仲の対象と二人きりかどうか判定する */
  const test = async () => {
    for await (const casts of groups.value) {
      /** 各地点において二人きりでない場合は判定しない */
      if (casts.length !== 2) continue
      for await (const myself of casts) {
        if (!myself.role.discord) continue
        for await (const discordId of myself.role.discord) {
          const discord = scene.value.casts[discordId]
          // 不仲な者と隣接している
          if (isNeighboring(myself, discord)) {
            // 感情を追加
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

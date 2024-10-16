import { useCastState, useCasts } from '@/composables'
import type { Scene, State } from '@/types'

/**
 * 聖女が登場する川渡りパズルの成否判定
 */
const useSceneSaint = (
  state: Ref<State>,
  scene: Ref<Scene>,
) => {
  const { feel, debuff, heal, diseased } = useCastState(state)
  const { unreachers, reachers, passengers } = useCasts(state, scene)

  /** 聖女が登場するパズルかどうか */
  const isValid = scene.value.casts.some(cast => cast.role.saint)

  /** 全員が毒に侵された状態かどうか判定する */
  const test = async () => {
    // 乗員がいる場合は判定しない
    if (passengers.value.flat().length > 0) return
    // 両岸にいる登場人物を判定する
    for await (const casts of [unreachers.value, reachers.value]) {
      // 同一の場所に聖女が3人以上いる場合、全員を回復する
      // if (casts.filter(cast => cast.role.saint).length >= 3) {
      //   for await (const myself of casts) {
      //     heal(myself)
      //   }
      // }
      // 全員が毒に侵されている場合、パズルは失敗
      if (casts.every(cast => diseased(cast))) {
        for await (const myself of casts) {
          feel(myself, 'scared')
        }
      }
    }
  }

  /** 聖女が登場するパズルの対岸到着時 */
  const crossed = async () => {
    // 乗員について判定する
    for await (const casts of passengers.value) {
      // 乗員に聖女がいれば状態異常を回復する
      if (casts.some(cast => cast.role.saint)) {
        for await (const myself of casts) {
          heal(myself)
        }
      // 乗員に聖女がいない場合、乗員全員が状態異常になる
      } else {
        for await (const myself of casts) {
          debuff(myself)
        }
      }
    }
  }

  return {
    isValid,
    test,
    crossed,
  }
}
export default useSceneSaint
export type UseSceneSaintReturn = ReturnType<typeof useSceneSaint>

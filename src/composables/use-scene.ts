import {
  useCarrier, useCarrierState, useCastState, useCasts,
  useSceneDiscord, useSceneMisanthrope, useSceneMonophobia, useScenePredators, useSceneRebels, useSceneRepairers, useSceneSaint
} from '@/composables'
import { carrierState } from '@/composables/use-carrier-state'
import { castState } from '@/composables/use-cast-state'
import type { Carrier, Cast, Move, Scene, State } from '@/types'

/**
 * 川渡りパズルの進行
 */
const useScene = (
  state: Ref<State>,
  scene: Ref<Scene>,
) => {
  const { coord: carrierCoord } = useCarrierState(state)
  const { getElapsedTime, hasPassengers, isVacancy } = useCarrier(state, scene)
  const { coord: castCoord, getOn, getOff, arrive: arriveCast, calmDown } = useCastState(state)
  const { passengers, isPeaceable, isReached } = useCasts(state, scene)
  // エルフ（人間嫌い）が登場するパズル
  const { isValid: hasMisanthrope, test: antagonism } = useSceneMisanthrope(state, scene)
  // 不仲な者達が登場するパズル
  const { isValid: hasDiscord, test: catfight } = useSceneDiscord(state, scene)
  // 吟遊詩人（孤独嫌い）が登場するパズル
  const { isValid: hasMonophobia, test: swarming } = useSceneMonophobia(state, scene)
  // 敵と保護者が登場するパズル
  const { isValid: hasPredators, test: predation } = useScenePredators(state, scene)
  // 聖女が登場するパズル
  const { isValid: hasSaint, test: poisoning, crossed: crossedPoison } = useSceneSaint(state, scene)
  // 半数以上を維持するパズル
  const { isValid: hasRebels, test: rebellion } = useSceneRebels(state, scene)
  // 乗り物の耐久性があるパズル
  const { isValid: hasRepairers, test: workout } = useSceneRepairers(state, scene)

  /** シーンの状態を初期化 */
  const init = async () => {
    state.value.carriers = scene.value.carriers.map(() => structuredClone(carrierState))
    state.value.casts = scene.value.casts.map(() => structuredClone(castState))
  }

  /** 搭乗可能な乗り物（空席があり、登場人物と同じ岸）がないか問い合わせる */
  const reserve = async (
    cast: Cast,
  ) => scene.value.carriers.find(carrier => (carrierCoord(carrier) === castCoord(cast)) && isVacancy(carrier, cast))

  /** 乗り物に登場人物を乗せる */
  const pickUp = async (
    cast: Cast,
  ) => {
    const carrier = await reserve(cast)
    if (carrier === undefined) return false
    getOn(cast, carrier)
    return true
  }

  /** 乗り物から登場人物を降ろす */
  const dropOff = async (
    cast: Cast,
  ) => {
    getOff(cast)
  }

  /** 乗り物が対岸に到着する */
  const arrive = async (
    carrier: Carrier,
  ) => {
    if (!hasPassengers(carrier)) return
    // 対岸到着時の動作
    await crossed()
    // 履歴を追加
    const move: Move = {
      casts: passengers.value[carrier.id],
      origin: castCoord(passengers.value[carrier.id][0]),
      destination: carrierCoord(carrier),
      value: getElapsedTime(carrier),
    }
    // 登場人物を乗り物から降ろす
    for await (const cast of passengers.value[carrier.id]) {
      arriveCast(cast, carrier)
      getOff(cast)
    }
    // 安否確認
    await safetyConfirmation()
    if (!isPeaceable.value) {
      move.result = 'failed'
    } else {
      if (isReached.value) {
        move.result = 'succeeded'
      }
    }
    return move
  }

  /** 対岸到着時 */
  const crossed = async () => {
    if (hasSaint) {
      await crossedPoison()
    }
  }

  /** 安否確認 */
  const safetyConfirmation = async () => {
    for await (const cast of scene.value.casts) {
      calmDown(cast)
    }
    // 敵と保護者が登場するパズルの成否判定
    if (hasPredators) {
      await predation()
    }
    // 不仲な者達が登場するパズルの成否判定
    if (hasDiscord) {
      await catfight()
    }
    // 半数以上を維持するパズルの成否判定
    if (hasRebels) {
      await rebellion()
    }
    // エルフ（人間嫌い）が登場するパズルの成否判定
    if (hasMisanthrope) {
      await antagonism()
    }
    // 吟遊詩人（孤独嫌い）が登場するパズルの成否判定
    if (hasMonophobia) {
      await swarming()
    }
    // 聖女が登場するパズルの成否判定
    if (hasSaint) {
      await poisoning()
    }
    // 乗り物の耐久性があるパズルの成否判定
    if (hasRepairers) {
      await workout()
    }
  }

  return {
    init,
    pickUp,
    dropOff,
    arrive,
    safetyConfirmation,
  }
}
export default useScene
export type UseSceneReturn = ReturnType<typeof useScene>

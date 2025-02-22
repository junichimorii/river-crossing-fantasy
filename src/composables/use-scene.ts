import {
  useCarrier, useCarrierState, useCastState, useCasts,
  useSceneDiscord, useSceneFreespirited, useSceneMisanthrope, useScenePredators,
  useSceneRebels, useSceneRepairers, useSceneSaint, useSceneWerewolves
} from '@/composables'
import { defaultState as defaultCarrierState } from '@/composables/use-carrier-state'
import { defaultState as defaultCastState } from '@/composables/use-cast-state'
import type { Bound, Carrier, Cast, Move, Scene, State } from '@/types'

/**
 * 川渡りパズルの進行
 */
const useScene = (
  state: Ref<State>,
  scene: Ref<Scene>,
) => {
  const { coord: carrierCoord, leave: leaveCarrier  } = useCarrierState(state)
  const { getDestination, getElapsedTime, hasPassengers, isVacancy } = useCarrier(state, scene)
  const { coord: castCoord, getOn, getOff, arrive: arriveCast, calmDown } = useCastState(state)
  const { passengers, isPeaceable, isReached } = useCasts(state, scene)

  // 不仲な者達が登場するパズル
  const { isValid: hasDiscord, test: catfight } = useSceneDiscord(state, scene)
  // 自由奔放が登場するパズル
  const { isValid: hasFreespirited, test: escapeJourney } = useSceneFreespirited(state, scene)
  // 人間嫌いが登場するパズル
  const { isValid: hasMisanthrope, test: antagonism } = useSceneMisanthrope(state, scene)
  // 敵と保護者が登場するパズル
  const { isValid: hasPredators, test: predation } = useScenePredators(state, scene)
  // 聖女が登場するパズル
  const { isValid: hasSaint, test: poisoning, crossed: crossedPoison } = useSceneSaint(state, scene)
  // 半数以上を維持するパズル
  const { isValid: hasRebels, test: rebellion } = useSceneRebels(state, scene)
  // 乗り物の耐久性があるパズル
  const { isValid: hasRepairers, test: workout } = useSceneRepairers(state, scene)
  // 人狼があるパズル
  const { isValid: hasWerewolves, test: attack } = useSceneWerewolves(state, scene)

  /** シーンの状態を初期化 */
  const init = async () => {
    state.value.carriers = scene.value.carriers.map(() => structuredClone(defaultCarrierState))
    state.value.casts = scene.value.casts.map(() => structuredClone(defaultCastState))
    state.value.casts.forEach((cast, i) => cast.coord = scene.value.casts[i].coord || cast.coord)
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

  /** 出発する */
  const leave = async (
    carrier: Carrier,
    bound: Bound,
  ) => {
    if (!hasPassengers(carrier)) return
    await leaveCarrier(carrier, getDestination(carrier, bound))
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
      casts: passengers.value[carrier.id].map(cast => cast.id),
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
    // 人間嫌いが登場するパズルの成否判定
    if (hasMisanthrope) {
      await antagonism()
    }
    // 自由奔放が登場するパズルの成否判定
    if (hasFreespirited) {
      await escapeJourney()
    }
    // 聖女が登場するパズルの成否判定
    if (hasSaint) {
      await poisoning()
    }
    // 乗り物の耐久性があるパズルの成否判定
    if (hasRepairers) {
      await workout()
    }
    // 人狼がいるパズル
    if (hasWerewolves) {
      await attack()
    }
  }

  return {
    init,
    pickUp,
    dropOff,
    leave,
    arrive,
    safetyConfirmation,
  }
}
export default useScene
export type UseSceneReturn = ReturnType<typeof useScene>

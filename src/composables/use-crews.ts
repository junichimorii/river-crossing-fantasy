import { useCrewState } from '@/composables'
import type { Scene, State } from '@/types'

/**
 * 川渡りパズル
 */
const useCrews = (
  state: Ref<State>,
  scene: Ref<Scene>,
) => {
  const { coord, boarding } = useCrewState(state)
  /** 出発地点の登場人物 */
  const unreachers = computed(() =>
    scene.value.crews.filter(crew => boarding(crew) === null && coord(crew) < 0)
  )

  /** 到着地点の登場人物 */
  const reachers = computed(() =>
    scene.value.crews.filter(crew => boarding(crew) === null && coord(crew) > 0)
  )

  /** 中間地点の登場人物 */
  const halfways = computed(() =>
    scene.value.crews.filter(crew => boarding(crew) === null && coord(crew) === 0)
  )

  /** 乗員 */
  const passengers = computed(() => {
    const carriers = scene.value.carriers.map(carrier => carrier.id)
    return carriers.map(carrier => scene.value.crews.filter(crew => boarding(crew) === carrier))
  })

  /** 各地点の登場人物 */
  const groups = computed(() => [
    unreachers.value,
    reachers.value,
    halfways.value,
    passengers.value.flat()
  ])

  /** すべての登場人物が安全な状態どうか */
  const isPeaceable = computed(() => state.value.crews.every(crewState => crewState.emotions.length === 0))

  /** すべての登場人物が出発地点にいるかどうか */
  const isUnreach = computed(() => state.value.crews.every((crewState, i) =>
    crewState.boarding === null && crewState.coord === (scene.value.crews[i].coord || -1)
  ))

  /** すべての登場人物が到着地点にいるかどうか */
  const isReached = computed(() => state.value.crews.every((crewState, i) =>
    crewState.boarding === null && crewState.coord === -(scene.value.crews[i].coord || -1)
  ))

  return {
    unreachers,
    reachers,
    halfways,
    passengers,
    groups,
    isPeaceable,
    isUnreach,
    isReached,
  }
}
export default useCrews
export type UseCrewsReturn = ReturnType<typeof useCrews>

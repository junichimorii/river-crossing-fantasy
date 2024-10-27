import { useCastState } from '@/composables'
import type { Scene, State } from '@/types'

/**
 * 川渡りパズル
 */
const useCasts = (
  state: Ref<State>,
  scene: Ref<Scene>,
) => {
  const { coord, boarding } = useCastState(state)
  /** 出発地点の登場人物 */
  const unreachers = computed(() =>
    scene.value.casts.filter(cast => boarding(cast) === null && coord(cast) < 0)
  )

  /** 到着地点の登場人物 */
  const reachers = computed(() =>
    scene.value.casts.filter(cast => boarding(cast) === null && coord(cast) > 0)
  )

  /** 中間地点の登場人物 */
  const halfways = computed(() =>
    scene.value.casts.filter(cast => boarding(cast) === null && coord(cast) === 0)
  )

  /** 乗員 */
  const passengers = computed(() => {
    const carriers = scene.value.carriers.map(carrier => carrier.id)
    return carriers.map(carrier => scene.value.casts.filter(cast => boarding(cast) === carrier))
  })

  /** 各地点の登場人物 */
  const groups = computed(() => [
    unreachers.value,
    reachers.value,
    halfways.value,
    passengers.value.flat()
  ])

  /** すべての登場人物が安全な状態どうか */
  const isPeaceable = computed(() => state.value.casts.every(castState => castState.emotions.length === 0))

  /** すべての登場人物が出発地点にいるかどうか */
  const isUnreach = computed(() => state.value.casts.every((castState, i) =>
    castState.boarding === null && castState.coord === (scene.value.casts[i].coord || -1)
  ))

  /** すべての登場人物が到着地点にいるかどうか */
  const isReached = computed(() => state.value.casts.every((castState, i) =>
    castState.boarding === null && castState.coord === -(scene.value.casts[i].coord || -1)
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
export default useCasts
export type UseCastsReturn = ReturnType<typeof useCasts>

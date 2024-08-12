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
  /**
   * 出発地点の登場人物
   */
  const unreachers = computed(() =>
    scene.value.casts.filter(cast => boarding(cast) === null && coord(cast) < 0)
  )

  /**
   * 到着地点の登場人物
   */
  const reachers = computed(() =>
    scene.value.casts.filter(cast => boarding(cast) === null && coord(cast) > 0)
  )

  /**
   * 中間地点の登場人物
   */
  const halfways = computed(() =>
    scene.value.casts.filter(cast => boarding(cast) === null && coord(cast) === 0)
  )

  /**
   * 乗員
   */
  const passengers = computed(() => Array.from(state.value.casts.map(castState => castState.boarding))
    .filter(boarded => boarded !== null)
    .sort()
    .map(boarded => scene.value.casts.filter(cast => boarding(cast) === boarded))
  )

  /**
   * 各地点の登場人物
   */
  const groups = computed(() => [
    unreachers.value,
    reachers.value,
    halfways.value,
    passengers.value.flat()
  ])

  /**
   * すべての登場人物が安全な状態どうか
   */
  const isPeaceable = computed(() => state.value.casts.every(castState => castState.emotions.length === 0))

  /**
   * すべての登場人物が出発地点にいるかどうか
   */
  const isUnreach = computed(() => state.value.casts.every(castState => castState.boarding === null && castState.coord < 0))

  /**
   * すべての登場人物が到着地点にいるかどうか
   */
  const isReached = computed(() => state.value.casts.every(castState => castState.boarding === null && castState.coord > 0))

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

import { computed } from 'vue'
import type { Ref } from 'vue'
import type { Scene } from '@/types/scene'
import type { State } from '@/types/state'

/**
 * 川渡りパズル
 */
const useCasts = (
  state: Ref<State>,
  scene: Ref<Scene>,
) => {
  /**
   * 出発地点の登場人物
   */
  const unreachers = computed(() =>
    scene.value.casts.filter((cast, i) => state.value.casts[i].boarding === null && !state.value.casts[i].isCrossed)
  )

  /**
   * 到着地点の登場人物
   */
  const reachers = computed(() =>
    scene.value.casts.filter((cast, i) => state.value.casts[i].boarding === null && state.value.casts[i].isCrossed)
  )

  /**
   * 乗員
   */
  const passengers = computed(() => Array.from(state.value.casts.map(cast => cast.boarding))
    .filter(boarding => boarding !== null)
    .sort()
    .map(boarding => scene.value.casts.filter((cast, i) => state.value.casts[i].boarding === boarding))
  )

  /**
   * 各地点の登場人物
   */
  const groups = computed(() => [
    unreachers.value,
    reachers.value,
    passengers.value.flat()
  ])

  /**
   * すべての登場人物が安全な状態どうか
   */
  const isPeaceable = computed(() => state.value.casts.every(cast => cast.emotions.length === 0))
  
  /**
   * すべての登場人物が出発地点にいるかどうか
   */
  const isUnreachEvery = computed(() => state.value.casts.every(cast => cast.boarding === null && !cast.isCrossed))
  
  /**
   * すべての登場人物が到着地点にいるかどうか
   */
  const isEeachEvery = computed(() => state.value.casts.every(cast => cast.boarding === null && cast.isCrossed))
  return {
    unreachers,
    reachers,
    passengers,
    groups,
    isPeaceable,
    isUnreachEvery,
    isEeachEvery,
  }
}
export default useCasts
export type UseCastsReturn = ReturnType<typeof useCasts>
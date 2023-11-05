import { computed } from 'vue'
import type { Ref } from 'vue'
import type { Scene } from '@/types/scene'

/**
 * 川渡りパズル
 */
const useScene = (
  state: Ref<Scene>
) => {
  /** 出発地点の登場人物 */
  const unreachers = computed(() => state.value.casts.filter(cast => cast.status.boarding === undefined && !cast.status.isCrossed))
  /** 到着地点の登場人物 */
  const reachers = computed(() => state.value.casts.filter(cast => cast.status.boarding === undefined && cast.status.isCrossed))
  /** 乗員 */
  const passengers = computed(() => state.value.carriers.map(carrier => 
    state.value.casts.filter(cast => cast.status.boarding === carrier.id)
  ))
  /** すべての登場人物が安全な状態どうか */
  const isPeaceable = computed(() => state.value.casts.every(cast => cast.status.emotions.length === 0))
  /** すべての登場人物が対岸にいるかどうか */
  const isCrossed = computed(() => state.value.casts.every(cast => cast.status.boarding === undefined && cast.status.isCrossed))
  return {
    unreachers,
    reachers,
    passengers,
    isPeaceable,
    isCrossed,
  }
}
export default useScene
export type UseSceneReturn = ReturnType<typeof useScene>
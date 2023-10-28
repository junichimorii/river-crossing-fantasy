import { computed, Ref } from 'vue'
import type { UseSwipeDirection } from '@vueuse/core'
import type { Cast, Status } from '@/types/cast'
/**
 * 川渡りパズルの登場人物の初期ステータス
 */
export const defaultStatus: Status = Object.freeze({
  disabled: false,
  isCrossed: false,
  boarding: undefined,
  emotions: [],
})
/**
 * 川渡りパズルの登場人物
 */
interface UseCastReturn {
  /** 進行方向 */
  bound: Ref<UseSwipeDirection>
  /** 感情 */
  emotion: Ref<{
    model: boolean
    content: string
    color: string
  }>
}
const useCast = (
  state: Cast
): UseCastReturn => {
  const bound = computed(() =>
    !state.status.disabled 
      // 乗り物の上から向こう岸に降りる or 手前の岸から乗り物に乗る時、上方向に移動できる
      ? (state.status.boarding !== undefined && state.status.isCrossed) || (state.status.boarding === undefined && !state.status.isCrossed)
        ? 'up'
        // 乗り物の上から手前の岸に降りる or 向こう岸から乗り物に乗る時、下方向に移動できる
        : (state.status.boarding !== undefined && !state.status.isCrossed) || (state.status.boarding === undefined && state.status.isCrossed)
          ? 'down'
          : 'none'
      : 'none'
  )
  const emotion = computed(() => {
    const emotions = Array.from(new Set(state.status.emotions))
    const isScared = emotions.includes('scared')  // 怖い、危機に瀕している
    const isExcited = emotions.includes('excited') // 興奮している、喜んでいる
    const isSurprised = emotions.includes('surprised')  // 驚いている、困っている
    const content = `${isScared?'😰':''}${isExcited?'😈':''}${isSurprised?'😖':''}`
    const color = isExcited
    ? 'red-lighten-4'
    : isScared
      ? 'blue-lighten-4'
      : isSurprised
        ? 'amber-lighten-4'
        : 'white'
    return {
      model: emotions.length > 0,
      content: content,
      color: color
    }
  })
  return {
    bound,
    emotion,
  }
}
export default useCast
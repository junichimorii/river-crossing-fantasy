// 川渡りパズルの登場人物
import { computed, Ref } from 'vue'
import type { UseSwipeDirection } from '@vueuse/core'
import type { Cast, Status } from '@/types/cast'
export const defaultStatus: Status = Object.freeze({
  isCrossed: false,
  isSeated: false,
  emotion: null,
})
interface UseCastReturn {
  getRequest: (direction: UseSwipeDirection) => 'getOff' | 'getOn' | null
  location: Ref<'origin' | 'destination' | null>
  pass: Ref<{up:boolean, down:boolean}>
  getOn: () => void
  getOff: () => void
}
const useCast = (
  state: Cast
): UseCastReturn => {
  // スワイプ終了後の行動
  const getRequest = (
    direction: UseSwipeDirection,
  ) => (state.status.isSeated && direction === (state.status.isCrossed ? 'up' : 'down'))
    ? 'getOff' // 乗り物から降りる
    : (!state.status.isSeated && direction === (state.status.isCrossed ? 'down' : 'up'))
      ? 'getOn' // 乗り物に乗る
      : null
  // 現在地
  const location = computed(() => (!state.status.isCrossed && !state.status.isSeated)
    ? 'origin'
    : (state.status.isCrossed && !state.status.isSeated)
      ? 'destination'
      : null
  )
  // 有効な進行方向
  const pass = computed(() => {
    return {
      // 乗り物の上から向こう岸に降りる or 手前の岸から乗り物に乗る時、上矢印を有効にする
      up: (state.status.isSeated && state.status.isCrossed)
        || (!state.status.isSeated && !state.status.isCrossed),
      // 乗り物の上から手前の岸に降りる or 向こう岸から乗り物に乗る時、下矢印を有効にする
      down: ((state.status.isSeated && !state.status.isCrossed)
        || (!state.status.isSeated && state.status.isCrossed))
    }
  })
  // 乗り物に乗る
  const getOn = () => {
    state.status.isSeated = true
  }
  // 乗り物から降りる
  const getOff = () => {
    state.status.isSeated = false
  }
  return {
    getRequest,
    location,
    pass,
    getOn,
    getOff,
  }
}
export default useCast
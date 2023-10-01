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
  location: Ref<'origin' | 'destination' | null>
  enableArrowUp: Ref<boolean>
  enableArrowDown: Ref<boolean>
  init: () => Promise<void>
  getRequest: (direction: UseSwipeDirection) => Promise<'getOff' | 'getOn' | null>
  getOn: () => Promise<void>
  getOff: () => Promise<void>
  crossed: () => Promise<void>
}
const useCast = (
  state: Cast
): UseCastReturn => {
  /**
   * 現在地
   */
  const location = computed(() => (!state.status.isCrossed && !state.status.isSeated)
    ? 'origin'
    : (state.status.isCrossed && !state.status.isSeated)
      ? 'destination'
      : null
  )
  /**
   * 乗り物の上から向こう岸に降りる or 手前の岸から乗り物に乗る時、上矢印を表示する
   */
  const enableArrowUp = computed(() =>
    (state.status.isSeated && state.status.isCrossed) || (!state.status.isSeated && !state.status.isCrossed)
  )
  /**
   * 乗り物の上から手前の岸に降りる or 向こう岸から乗り物に乗る時、下矢印を表示する
   */
  const enableArrowDown = computed(() =>
    (state.status.isSeated && !state.status.isCrossed) || (!state.status.isSeated && state.status.isCrossed)
  )
  /**
   * 初期化
   */
  const init = async () => {
    console.log(`useCast: init cast ${state.id}`)
    Object.assign(state.status, {...defaultStatus})
  }
  /**
   * スワイプ終了後の行動
   */
  const getRequest = async (
    direction: UseSwipeDirection,
  ) => {
    return (state.status.isSeated && direction === (state.status.isCrossed ? 'up' : 'down'))
    ? 'getOff' // 乗り物から降りる
    : (!state.status.isSeated && direction === (state.status.isCrossed ? 'down' : 'up'))
      ? 'getOn' // 乗り物に乗る
      : null
  }
  /**
   * 乗り物に乗る
   */
  const getOn = async () => {
    console.log(`useCast: getOn cast ${state.id}`)
    state.status.isSeated = true
  }
  /**
   * 乗り物から降りる
   */
  const getOff = async () => {
    console.log(`useCast: getOff cast ${state.id}`)
    state.status.isSeated = false
  }
  /**
   * 対岸に到着する
   */
  const crossed = async () => {
    console.log(`useCast: crossed cast ${state.id}`)
    state.status.isCrossed = !state.status.isCrossed
  }
  return {
    location,
    enableArrowUp,
    enableArrowDown,
    init,
    getRequest,
    getOn,
    getOff,
    crossed,
  }
}
export default useCast
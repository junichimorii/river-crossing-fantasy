import { computed, Ref } from 'vue'
import type { UseSwipeDirection } from '@vueuse/core'
import type { Cast, Status } from '@/types/cast'
/**
 * 川渡りパズルの登場人物の初期ステータス
 */
export const defaultStatus: Status = Object.freeze({
  disabled: false,
  isCrossed: false,
  isSeated: false,
  emotions: [],
})
/**
 * 川渡りパズルの登場人物
 */
interface UseCastReturn {
  /** 現在地 */
  location: Ref<'origin' | 'destination' | 'onBoard'>
  /** 進行方向 */
  bound: Ref<UseSwipeDirection>
  /** 感情 */
  emotion: Ref<{
    model: boolean;
    content: string;
    color: string;
  }>
  /** ステータスの変更を無効にする */
  deactivate: () => Promise<void>
  /** ステータスの変更を有効にする */
  activate: () => Promise<void>
  /** スワイプ終了後の行動 */
  request: (direction: UseSwipeDirection) => Promise<'getOff' | 'getOn' | null>
  /** 乗り物に乗る */
  getOn: () => Promise<void>
  /** 乗り物から降りる */
  getOff: () => Promise<void>
  /** 対岸に到着する */
  crossed: () => Promise<void>
}
const useCast = (
  state: Cast
): UseCastReturn => {
  const location = computed(() => state.status.isSeated
    ? 'onBoard'
    : state.status.isCrossed
      ? 'destination'
      : 'origin'
  )
  const bound = computed(() =>
    !state.status.disabled 
      // 乗り物の上から向こう岸に降りる or 手前の岸から乗り物に乗る時、上方向に移動できる
      ? (state.status.isSeated && state.status.isCrossed) || (!state.status.isSeated && !state.status.isCrossed)
        ? 'up'
        // 乗り物の上から手前の岸に降りる or 向こう岸から乗り物に乗る時、下方向に移動できる
        : (state.status.isSeated && !state.status.isCrossed) || (!state.status.isSeated && state.status.isCrossed)
          ? 'down'
          : 'none'
      : 'none'
  )
  const emotion = computed(() => {
    return {
      model: state.status.emotions.length !== 0,
      content: state.status.emotions.join(''),
      color: state.status.emotions.includes('😈')
        ? 'red-lighten-4'
        : state.status.emotions.includes('😰')
          ? 'blue-lighten-4'
          : state.status.emotions.includes('😖')
            ? 'amber-lighten-4'
            : 'white'
    }
  })
  const deactivate = async () => {
    state.status.disabled = true
  }
  const activate = async () => {
    state.status.disabled = false
  }
  const request = async (
    direction: UseSwipeDirection,
  ) => {
    return (state.status.isSeated && direction === (state.status.isCrossed ? 'up' : 'down'))
    ? 'getOff' // 乗り物から降りる
    : (!state.status.isSeated && direction === (state.status.isCrossed ? 'down' : 'up'))
      ? 'getOn' // 乗り物に乗る
      : null
  }
  const getOn = async () => {
    state.status.isSeated = true
  }
  const getOff = async () => {
    state.status.isSeated = false
  }
  const crossed = async () => {
    state.status.isCrossed = !state.status.isCrossed
  }
  return {
    location,
    bound,
    emotion,
    deactivate,
    activate,
    request,
    getOn,
    getOff,
    crossed,
  }
}
export default useCast
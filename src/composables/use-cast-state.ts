import type { Ref } from 'vue'
import type { Carrier, Cast, State } from '@/types'
import type { CastState, Emotion } from '@/types/state'
export const castState: CastState = Object.freeze({
  isCrossed: false,
  boarding: null,
  emotions: [],
})

/**
 * 川渡りパズルの登場人物の状態管理
 */
const useCastState = (
  state: Ref<State>,
) => {

  /** 
   * 登場人物が開始地点の対岸にいるかどうか
   */
  const isCrossed = (
    cast: Cast
  ) => state.value.casts[cast.id].isCrossed

  /**
   * 登場人物が乗っている乗り物
   */
  const boarding = (
    cast: Cast
  ) => state.value.casts[cast.id].boarding

  /**
   * 登場人物の感情
   * */
  const emotions = (
    cast: Cast,
  ) => state.value.casts[cast.id].emotions

  /**
   * 登場人物が乗り物に乗る
   */
  const getOn = async (
    cast: Cast,
    carrier: Carrier
  ) => {
    state.value.casts[cast.id].boarding = carrier.id
  }

  /**
   * 登場人物が乗り物から降りる
   */
  const getOff = async (
    cast: Cast,
  ) => {
    state.value.casts[cast.id].boarding = null
  }

  /**
   * 登場人物が川を渡る
   */
  const cross = (
    cast: Cast
  ) => state.value.casts[cast.id].isCrossed = !state.value.casts[cast.id].isCrossed

  /**
   * 登場人物の感情を追加する
   */
  const feel = (
    cast: Cast,
    emotion: Emotion
  ) => state.value.casts[cast.id].emotions.push(emotion)

  /**
   * 登場人物の感情を削除する
   */
  const calmDown = (
    cast: Cast,
  ) => state.value.casts[cast.id].emotions = []

  /**
   * 2人の登場人物が隣接しているかどうか
   */
  const isNeighboring = (
    a: Cast,
    b: Cast,
  ) => (state.value.casts[a.id].boarding === state.value.casts[b.id].boarding)
    && (state.value.casts[a.id].isCrossed === state.value.casts[b.id].isCrossed)

  return {
    isCrossed,
    boarding,
    emotions,
    getOn,
    getOff,
    cross,
    feel,
    calmDown,
    isNeighboring,
  }
}
export default useCastState
export type UseCastStateReturn = ReturnType<typeof useCastState>
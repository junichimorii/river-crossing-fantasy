import type { Ref } from 'vue'
import type { Cast } from '@/types/cast'
import type { Scene } from '@/types/scene'
import type { State, CarrierState, CastState, Emotion } from '@/types/state'
const crrierState: CarrierState = Object.freeze({
  isCrossed: false,
})
const castState: CastState = Object.freeze({
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

  /** 開始地点の対岸にいるかどうか */
  const isCrossed = (
    cast: Cast
  ) => state.value.casts[cast.id].isCrossed

  /** 乗っている乗り物 */
  const boarding = (
    cast: Cast
  ) => state.value.casts[cast.id].boarding

  /** 登場人物の感情 */
  const emotions = (
    cast: Cast,
  ) => state.value.casts[cast.id].emotions

  /** 川を渡る */
  const cross = (
    cast: Cast
  ) => state.value.casts[cast.id].isCrossed = !state.value.casts[cast.id].isCrossed

  /** 感情を追加する */
  const feel = (
    cast: Cast,
    emotion: Emotion
  ) => state.value.casts[cast.id].emotions.push(emotion)

  /** 感情を削除する */
  const calmDown = (
    cast: Cast,
  ) => state.value.casts[cast.id].emotions = []

  return {
    isCrossed,
    boarding,
    emotions,
    cross,
    feel,
    calmDown,
  }
}
export default useCastState
export type UseCastStateReturn = ReturnType<typeof useCastState>
import type { Carrier, Cast, State } from '@/types'
import type { CastState, Emotion } from '@/types/state'
export const castState: CastState = Object.freeze({
  coord: -1,
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
   * 登場人物の座標
   */
  const coord = (
    cast: Cast
  ) => state.value.casts[cast.id].coord

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
  const arrive = (
    cast: Cast,
    carrier: Carrier
  ) => {
    state.value.casts[cast.id].coord = state.value.carriers[carrier.id].coord
  }

  /**
   * 登場人物の感情を追加する
   */
  const feel = (
    cast: Cast,
    emotion: Emotion
  ) => {
    state.value.casts[cast.id].emotions.push(emotion)
  }

  /**
   * 登場人物の感情を削除する
   */
  const calmDown = (
    cast: Cast,
  ) => {
    state.value.casts[cast.id].emotions = []
  }

  /**
   * 2人の登場人物が隣接しているかどうか
   */
  const isNeighboring = (
    a: Cast,
    b: Cast,
  ) => (state.value.casts[a.id].boarding === state.value.casts[b.id].boarding)
    && (state.value.casts[a.id].coord === state.value.casts[b.id].coord)

  return {
    coord,
    boarding,
    emotions,
    getOn,
    getOff,
    arrive,
    feel,
    calmDown,
    isNeighboring,
  }
}
export default useCastState
export type UseCastStateReturn = ReturnType<typeof useCastState>
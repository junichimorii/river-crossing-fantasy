import type { Carrier, Crew, CrewState, Emotion, State } from '@/types'
export const defaultState: CrewState = Object.freeze({
  coord: -1,
  boarding: null,
  emotions: [],
  diseased: false,
})

/**
 * 川渡りパズルの登場人物の状態管理
 */
const useCrewState = (
  state: Ref<State>,
) => {
  /** 登場人物の座標 */
  const coord = (
    crew: Crew
  ) => state.value.crews[crew.id].coord

  /** 登場人物が乗っている乗り物 */
  const boarding = (
    crew: Crew
  ) => state.value.crews[crew.id].boarding

  /** 登場人物の感情 */
  const emotions = (
    crew: Crew,
  ) => state.value.crews[crew.id].emotions

  /** 登場人物が状態異常かどうか */
  const diseased = (
    crew: Crew,
  ) => state.value.crews[crew.id].diseased

  /** 登場人物が乗り物に乗る */
  const getOn = async (
    crew: Crew,
    carrier: Carrier
  ) => {
    state.value.crews[crew.id].boarding = carrier.id
  }

  /** 登場人物が乗り物から降りる */
  const getOff = async (
    crew: Crew,
  ) => {
    state.value.crews[crew.id].boarding = null
  }

  /** 登場人物が川を渡る */
  const arrive = (
    crew: Crew,
    carrier: Carrier
  ) => {
    state.value.crews[crew.id].coord = state.value.carriers[carrier.id].coord
  }

  /** 登場人物の感情を追加する */
  const feel = (
    crew: Crew,
    emotion: Emotion
  ) => {
    state.value.crews[crew.id].emotions.push(emotion)
  }

  /** 登場人物の感情を削除する */
  const calmDown = (
    crew: Crew,
  ) => {
    state.value.crews[crew.id].emotions = []
  }

  /** 登場人物を状態異常にする */
  const debuff = (
    crew: Crew,
  ) => {
    state.value.crews[crew.id].diseased = true
  }

  /** 登場人物の状態異常を治療する */
  const heal = (
    crew: Crew,
  ) => {
    state.value.crews[crew.id].diseased = false
  }

  /** 2人の登場人物が隣接しているかどうか */
  const isNeighboring = (
    a: Crew,
    b: Crew,
  ) => (state.value.crews[a.id].boarding === state.value.crews[b.id].boarding)
    && (state.value.crews[a.id].coord === state.value.crews[b.id].coord)

  return {
    coord,
    boarding,
    emotions,
    diseased,
    getOn,
    getOff,
    arrive,
    feel,
    calmDown,
    debuff,
    heal,
    isNeighboring,
  }
}
export default useCrewState
export type UseCrewStateReturn = ReturnType<typeof useCrewState>

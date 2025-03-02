import type { Crew } from '@/types'

/**
 * 川渡りパズルの登場人物
 */
const useCrew = () => {
  /** 説明 */
  const getDescription = (
    crew: Crew
  ) => [
    crew.role.rower !== undefined ?
      crew.role.rower
        ? '筏（いかだ）を漕（こ）げる。'
        : '筏（いかだ）を漕（こ）げない。'
      : '',
    crew.role.duration !== undefined ? `橋を渡るのに${crew.role.duration}分必要。` : '',
    crew.role.weight !== undefined ? `重量は定員${crew.role.weight.toFixed(1)}人分。` : '',
    crew.role.misanthrope ? '人間と一緒に筏（いかだ）に乗ることを嫌う。' : '',
    crew.role.freespirited ? '自由に行動できる状況になると逃走を企てる。' : '',
    crew.role.monophobia ? '独りぼっちを嫌う。' : '',
    crew.role.saint ? '本人および同乗者の毒を浄化する。' : '',
    crew.role.repairer ? '筏（いかだ）を修理できる。' : '',
    crew.role.werewolf ? '村人陣営と同数以上になった場合、村人陣営を襲う。' : '',
    crew.description
  ].join('')

  /** 所要時間 */
  const getDuration = (
    crew: Crew
  ) => crew.role.duration || 1

  /** CSS scaleプロパティ */
  const getScale = (
    crew: Crew,
    coord: number
  ) => {
    const ratio = isRower(crew) ? 1 : 0.85
    return `${coord > 0 ? -ratio : ratio} ${ratio}`
  }

  /** 重量 */
  const getWeight = (
    crew: Crew
  ) => crew.role.weight || 1

  /** 乗り物を操作できる */
  const isRower = (
    crew: Crew
  ) => crew.role.rower === undefined || crew.role.rower

  return {
    getDescription,
    getDuration,
    getScale,
    getWeight,
    isRower,
  }
}
export default useCrew
export type UseCrewReturn = ReturnType<typeof useCrew>

import type { Cast } from '@/types'

/**
 * 川渡りパズルの登場人物
 */
const useCast = () => {
  /** 説明 */
  const getDescription = (
    cast: Cast
  ) => [
    cast.role.rower !== undefined ?
      cast.role.rower
        ? '筏（いかだ）を漕（こ）げる。'
        : '筏（いかだ）を漕（こ）げない。'
      : '',
    cast.role.duration !== undefined ? `橋を渡るのに${cast.role.duration}分必要。` : '',
    cast.role.weight !== undefined ? `重量は定員${cast.role.weight.toFixed(1)}人分。` : '',
    cast.role.misanthrope ? '人間と一緒に筏（いかだ）に乗ることを嫌う。' : '',
    cast.role.freespirited ? '自由に行動できる状況になると逃走を企てる。' : '',
    cast.role.monophobia ? '独りぼっちを嫌う。' : '',
    cast.role.saint ? '本人および同乗者の毒を浄化する。' : '',
    cast.role.repairer ? '筏（いかだ）を修理できる。' : '',
    cast.role.werewolf ? '村人陣営と同数以上になった場合、村人陣営を襲う。' : '',
    cast.description
  ].join('')

  /** 所要時間 */
  const getDuration = (
    cast: Cast
  ) => cast.role.duration || 1

  /** CSS scaleプロパティ */
  const getScale = (
    cast: Cast,
    coord: number
  ) => {
    const ratio = isRower(cast) ? 1 : 0.85
    return `${coord > 0 ? -ratio : ratio} ${ratio}`
  }

  /** 重量 */
  const getWeight = (
    cast: Cast
  ) => cast.role.weight || 1

  /** 乗り物を操作できる */
  const isRower = (
    cast: Cast
  ) => cast.role.rower === undefined || cast.role.rower

  return {
    getDescription,
    getDuration,
    getScale,
    getWeight,
    isRower,
  }
}
export default useCast
export type UseCastReturn = ReturnType<typeof useCast>

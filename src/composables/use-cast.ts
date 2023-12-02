import type { Cast } from '@/types'

/**
 * 川渡りパズルの登場人物
 */
const useCast = () => {
  /**
   * 乗り物を操作できる
   */
  const isRower = (
    cast: Cast
  ) => cast.role.rower === undefined || cast.role.rower

  /**
   * CSS transformプロパティ
   */
  const getTransform = (
    cast: Cast,
    coord: number
  ) => {
    const ratio = isRower(cast) ? 1 : 0.85
    return `scale(${coord > 0 ? -ratio : ratio}, ${ratio})`
  }

  /**
   * 重量
   */
  const getWeight = (
    cast: Cast
  ) => cast.role.weight || 1

  /**
   * 所要時間
   */
  const getDuration = (
    cast: Cast
  ) => cast.role.duration || 1

  return {
    isRower,
    getTransform,
    getWeight,
    getDuration,
  }
}
export default useCast
export type UseCastReturn = ReturnType<typeof useCast>
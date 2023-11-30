import type { Cast } from '@/types'

/**
 * 川渡りパズルの登場人物
 */
const useCast = () => {
  /**
   * 乗り物をを操作できる
   */
  const isRower = (
    cast: Cast
  ) => cast.role.rower === undefined || cast.role.rower

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
    getWeight,
    getDuration,
  }
}
export default useCast
export type UseCastReturn = ReturnType<typeof useCast>
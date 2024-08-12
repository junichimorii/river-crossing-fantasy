const { width, height } = useWindowSize()

/**
 * 川渡りパズルの外観・操作
 */
const useAppearance = () => {
  /** ステージのサイズ */
  const stageSize = computed(() => Math.min(width.value, height.value))
  /** コンテンツの高さ */
  const navigationHeight = computed(() => height.value - stageSize.value - 64 - 56)
  /** 登場人物一人分の幅 */
  const gridSize = computed(() => stageSize.value * 0.96 / 10)
  return {
    stageSize,
    navigationHeight,
    gridSize,
  }
}
export default useAppearance
export type UseAppearanceReturn = ReturnType<typeof useAppearance>

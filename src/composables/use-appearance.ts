import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
import type { Scene } from '@/types'
const { width, height } = useWindowSize()

/**
 * 川渡りパズルの外観・操作
 */
const useAppearance = (
  config: Scene,
) => {
  /** ステージのサイズ */
  const stageSize = computed(() => Math.min(width.value, height.value))
  /** コンテンツの高さ */
  const navigationHeight = computed(() => height.value - stageSize.value - 56)
  /** 登場人物一人分の幅 */
  const gridSize = computed(() => Math.min(stageSize.value / config.casts.length, stageSize.value / 10))
  return {
    stageSize,
    navigationHeight,
    gridSize,
  }
}
export default useAppearance
export type UseAppearanceReturn = ReturnType<typeof useAppearance>
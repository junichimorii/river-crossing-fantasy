import { computed } from 'vue'
import type { Carrier, Scene } from '@/types'
import { useAppearance } from '@/composables'

/**
 * 川渡りパズルの乗り物の外観
 */
const useCarrierAppearance = (
  config: Scene,
  state: Carrier,
) => {
  const { gridSize } = useAppearance(config)
  // 幅（登場人物の幅 * （登場人物の人数 + 1））
  const width = computed(() =>gridSize.value * (state.capacity + 1))
  // 高さ（登場人物の高さ * 2.5）
  const height = computed(() =>gridSize.value * 2.5)
  // アスペクト比
  const aspectRatio = computed(() => width.value / height.value)
  return {
    width,
    height,
    aspectRatio,
  }
}
export default useCarrierAppearance
export type UseCarrierAppearanceReturn = ReturnType<typeof useCarrierAppearance>
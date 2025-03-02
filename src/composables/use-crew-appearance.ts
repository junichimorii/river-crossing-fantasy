import { useAppearance } from '@/composables'

/**
 * 川渡りパズルの登場人物の外観
 */
const useCrewAppearance = () => {
  const { gridSize } = useAppearance()
  /** 幅（登場人物の幅 * 登場人物の人数 + 登場人物の幅 / 2）  */
  const width = computed(() => gridSize.value)

  /** 高さ（登場人物の高さ） */
  const height = computed(() => width.value * 2)

  /** アスペクト比 */
  const aspectRatio = computed(() => width.value / height.value)

  return {
    width,
    height,
    aspectRatio,
  }
}
export default useCrewAppearance
export type UseCrewAppearanceReturn = ReturnType<typeof useCrewAppearance>

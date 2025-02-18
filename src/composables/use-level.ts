import type { Scene } from '@/types'

/**
 * 不仲な者達が登場する川渡りパズルの成否判定
 */
const useLevel = (
  scene: Ref<Scene>,
) => {
  const level = computed(() => {
    const n = scene.value.level !== undefined
      ? scene.value.level
      : scene.value.passing >= 21
        ? 5
        : scene.value.passing >= 17
          ? 4
          : scene.value.passing >= 11
            ? 3
            : scene.value.passing >= 5
              ? 2
              : 1
    return `level${n}`
  })
  return {
    level,
  }
}
export default useLevel
export type UseLevelReturn = ReturnType<typeof useLevel>

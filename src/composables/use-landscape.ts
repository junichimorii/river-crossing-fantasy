import sprites from '@/assets/images/landscapes';
import type { Scene } from '@/types';

/**
 * 川渡りパズルの背景
 */
const useLandscape = (
  scene: Ref<Scene>,
) => {
  const landscape = computed(() =>
    scene.value.landscape?.island
      ? sprites.island
      : scene.value.landscape?.night
        ? sprites.night
        : scene.value.landscape?.poison
          ? sprites.poison
          : sprites.river
  )
  return {
    landscape,
  }
}
export default useLandscape
export type UseLandscapeReturn = ReturnType<typeof useLandscape>

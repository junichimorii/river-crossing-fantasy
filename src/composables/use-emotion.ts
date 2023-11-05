import { computed } from 'vue'
import type { Cast } from '@/types/cast'

/**
 * 川渡りパズルの登場人物の感情
 */
const useEmotion = (
  state: Cast
) => {
  const emotions = computed(() => Array.from(new Set(state.status.emotions)))
  const isScared = computed(() => emotions.value.includes('scared'))  // 怖い、危機に瀕している
  const isExcited = computed(() => emotions.value.includes('excited')) // 興奮している、喜んでいる
  const isSurprised = computed(() => emotions.value.includes('surprised'))  // 驚いている、困っている
  const model = computed(() => emotions.value.length > 0)
  const content = computed(() => `${isScared.value?'😰':''}${isExcited.value?'😈':''}${isSurprised.value?'😖':''}`)
  const color = computed(() => isExcited.value
    ? 'red-lighten-4'
    : isScared.value
      ? 'blue-lighten-4'
      : isSurprised.value
        ? 'amber-lighten-4'
        : 'white'
  )
  return {
    model,
    content,
    color,
  }
}
export default useEmotion
export type UseEmotionReturn = ReturnType<typeof useEmotion>
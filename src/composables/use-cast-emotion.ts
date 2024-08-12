import { useCastState } from '@/composables'
import type { Cast, State } from '@/types'

/**
 * 川渡りパズルの登場人物の感情
 */
const useCastEmotion = (
  state: Ref<State>,
  cast: Cast
) => {
  const { emotions } = useCastState(state)
  const isScared = computed(() => emotions(cast).includes('scared'))
  const isExcited = computed(() => emotions(cast).includes('excited'))
  const isSurprised = computed(() => emotions(cast).includes('surprised'))
  const model = computed(() => emotions(cast).length > 0)
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
export default useCastEmotion
export type UseCastEmotionReturn = ReturnType<typeof useCastEmotion>

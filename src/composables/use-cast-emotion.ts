import { useCastState } from '@/composables'
import type { Cast, State } from '@/types'

/**
 * 川渡りパズルの登場人物の感情と健康状態
 */
const useCastEmotion = (
  state: Ref<State>,
  cast: Ref<Cast>
) => {
  const { emotions, diseased } = useCastState(state)
  const isScared = computed(() => emotions(cast.value).includes('scared'))
  const isExcited = computed(() => emotions(cast.value).includes('excited'))
  const isSurprised = computed(() => emotions(cast.value).includes('surprised'))
  const model = computed(() => emotions(cast.value).length > 0 || diseased(cast.value))
  const content = computed(() =>
    `${isScared.value?'😰':''}${isExcited.value?'😈':''}${isSurprised.value?'😖':''}${diseased(cast.value)?'❤️‍🩹':''}`
  )
  const color = computed(() =>
    diseased(cast.value)
      ? 'purple-lighten-4'
      : isExcited.value
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

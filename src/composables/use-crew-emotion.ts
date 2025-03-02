import { useCrewState } from '@/composables'
import type { Crew, State } from '@/types'

/**
 * 川渡りパズルの登場人物の感情と健康状態
 */
const useCrewEmotion = (
  state: Ref<State>,
  crew: Ref<Crew>
) => {
  const { emotions, diseased } = useCrewState(state)
  const isScared = computed(() => emotions(crew.value).includes('scared'))
  const isExcited = computed(() => emotions(crew.value).includes('excited'))
  const isSurprised = computed(() => emotions(crew.value).includes('surprised'))
  const model = computed(() => emotions(crew.value).length > 0 || diseased(crew.value))
  const content = computed(() =>
    `${isScared.value?'😰':''}${isExcited.value?'😈':''}${isSurprised.value?'😖':''}${diseased(crew.value)?'❤️‍🩹':''}`
  )
  const color = computed(() =>
    diseased(crew.value)
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
export default useCrewEmotion
export type UseCrewEmotionReturn = ReturnType<typeof useCrewEmotion>

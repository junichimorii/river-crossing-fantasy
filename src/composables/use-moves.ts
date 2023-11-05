import { computed } from 'vue'
import type { Ref } from 'vue'
import type { Move } from '@/types/moves'

/**
 * 川渡りパズルの行動履歴
 */
const useMoves = (
  state: Ref<Set<Move>>
) => {
  /** カウンター */
  const count = computed(() => Array.from(state.value).reduce((a, b) => a + b.value, 0))
  return {
    count,
  }
}
export default useMoves
export type UseMovesReturn = ReturnType<typeof useMoves>
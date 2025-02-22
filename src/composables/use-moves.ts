import type { Move } from '@/types'

/**
 * 川渡りパズルの行動履歴
 */
const useMoves = (
  moves: Ref<Set<Move>>,
) => {
  /** カウンター */
  const count = computed(() => Array.from(moves.value).reduce((a, b) => a + b.value, 0))

  /** 成功したか */
  const isSucceeded = computed(() => Array.from(moves.value).some(move => move.result === 'succeeded'))

  /** 失敗したか */
  const isFailed = computed(() => Array.from(moves.value).some(move => move.result === 'failed'))

  return {
    count,
    isSucceeded,
    isFailed,
  }
}
export default useMoves
export type UseMovesReturn = ReturnType<typeof useMoves>

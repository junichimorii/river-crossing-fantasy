import type { Move, Scene } from '@/types'

/**
 * 川渡りパズルの行動履歴
 */
const useMoves = (
  moves: Ref<Set<Move>>,
  scene?: Ref<Scene>,
) => {
  /** カウンター */
  const count = computed(() => Array.from(moves.value).reduce((a, b) => a + b.value, 0))

  /** カウンターの色 */
  const color = computed(() => scene
    ? count.value <= scene.value.passing
      ? 'success'
      : 'error'
    : 'black'
  )

  /** 成功したか */
  const isSucceeded = computed(() => Array.from(moves.value).some(move => move.result === 'succeeded'))

  /** 失敗したか */
  const isFailed = computed(() => Array.from(moves.value).some(move => move.result === 'failed'))

  /** 行動履歴を初期化 */
  const init = async () => {
    moves.value.clear()
  }

  return {
    count,
    color,
    isSucceeded,
    isFailed,
    init,
  }
}
export default useMoves
export type UseMovesReturn = ReturnType<typeof useMoves>

import type { Scene } from '@/types'

/**
 * 川渡りパズルのルールを生成する
 */
const useRules = (
) => {
  /** 条件 */
  const getConditions = (
    scene: Scene
  ) => scene.rules.conditions.length === 2
    ? scene.rules.conditions
    : scene.rules.conditions.concat(
      scene.landscape?.night
        ? '最短時間でクリアする'
        : '最小回数でクリアする'
    )

  /** 移動手段 */
  const getTransportation = (
    scene: Scene
  ) => `${getCapacity(scene)}${getCrewSuffix(scene)}${getRowerSuffix(scene)}${getLandscapeSuffix(scene)}`

  /** 定員 */
  const getCapacity = (
    scene: Scene
  ) => scene.carriers.map(carrier =>
    scene.landscape?.night
    ? carrier.capacity >= 2
      ? `吊り橋の人数制限は${carrier.capacity}人まで。`
      : ''
    : scene.crews.some(crew => crew.role.weight)
      ? `${carrier.capacity}人乗り、重量制限${carrier.capacity.toFixed(1)}人分の筏（いかだ）が1艘（そう）。`
      : `${carrier.capacity}人乗りの筏（いかだ）が1艘（そう）。`
  ).join('')

  /** ステージの登場人物による条件 */
  const getCrewSuffix = (
    scene: Scene
  ) => scene.crews.some(crew => crew.role.repairer)
    ? 'ただし1回乗る度に修理が必要。'
    : ''

  /** ステージの登場人物による条件 */
  const getRowerSuffix = (
    scene: Scene
  ) => scene.crews.every(crew => crew.role.rower)
    ? '全員が筏（いかだ）を漕（こ）げる。'
    : ''

  /** ステージの特徴による条件 */
  const getLandscapeSuffix = (
    scene: Scene
  ) => scene.landscape?.night
    ? '移動時はたいまつが必要。'
    : scene.landscape?.island
      ? '川の中の島に降りることもできる。'
      : ''

  return {
    getConditions,
    getTransportation,
  }
}
export default useRules
export type UseRulesReturn = ReturnType<typeof useRules>

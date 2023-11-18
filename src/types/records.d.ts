/**
 * 川渡りパズルの実績
 */
export interface Records {
  /** 攻略したシーン（ステージ）のID */
  scenes: Map<number, number>
  /** 攻略したシーン（ステージ）のレベル */
  level: Set<number>
}

/**
 * 川渡りパズルの実績
 */
export interface Records {
  /** 攻略したシーン（ステージ）のID */
  scenes: Map<number, number>
}

export interface Category {
  id: number
  name: string
  description: string
}

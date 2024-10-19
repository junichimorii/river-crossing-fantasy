/**
 * 登場人物
 */
export interface Cast {
  /** 登場人物のID */
  id: number
  /** 登場人物の名前 */
  name: string
  /** 登場人物の説明 */
  description?: string
  /** 登場人物の外観 */
  appearance: string
  /** 登場人物の役割 */
  role: Role
}

/**
 * 登場人物の役割
 */
interface Role {
  /** 亜人 */
  demihuman?: boolean
  /** 不仲 */
  discord?: number[]
  /** 所要時間 */
  duration?: number
  /** 人間嫌い */
  misanthrope?: boolean
  /** 孤独が嫌い */
  monophobia?: boolean
  /** 聖女 */
  saint?: boolean
  /** 天敵と保護者 */
  predators?: {
    predator: number  // 敵のID
    guardian: number  // 保護者のID
  }[]
  /** （半数以上を維持するパズルにおける）反逆者 */
  rebel?: boolean
  /** 乗り物を修理できる */
  repairer?: boolean
  /** 乗り物を操作できる */
  rower?: boolean
  /** 重量 */
  weight?: number
  /** 人狼 */
  werewolf?: boolean
}

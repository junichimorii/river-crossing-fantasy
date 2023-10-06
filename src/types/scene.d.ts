// 川渡りパズルのシーン
import { Carrier } from '@/types/carrier'
import { Cast } from '@/types/cast'
export interface Scene {
  id: number
  title: string
  description: {
    conditions: string
    transportation: string
  }
  landscape: string
  carriers: Carrier[]
  casts: Cast[]
}
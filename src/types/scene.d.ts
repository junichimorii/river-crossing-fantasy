// 川渡りパズルのシーン
import { Carrier } from '@/types/carrier'
import { Cast } from '@/types/cast'
export interface Scene {
  carriers: Carrier[]
  casts: Cast[]
}
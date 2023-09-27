import { Config } from '@/types/config'
import { defaultStatus as defaultCarrierStatus } from '@/composable/use-carrier'
import { defaultStatus as defaultCastStatus } from '@/composable/use-cast'
const config: Config = {
  carriers: [{
    id: 0,
    capacity: 1,
    status: {...defaultCarrierStatus},
  }],
  casts: [{
    id: 0,
    role: {
      canRow: true,
    },
    status: {...defaultCastStatus},
  }, {
    id: 1,
    role: {
      canRow: true,
    },
    status: {...defaultCastStatus},
  }],
}
export default config

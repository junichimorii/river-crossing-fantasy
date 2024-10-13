<script lang="ts" setup>
import { useCarrier, useCarrierState, useCasts } from '@/composables';
import { useSceneStore } from '@/stores/scene';
import type { Bound, Carrier } from '@/types';
const props = defineProps<{
  state: Carrier
}>()
const { state: carrier } = toRefs(props)
const { state, scene, disabled } = storeToRefs(useSceneStore())
const { coord, leave: leaveCarrier } = useCarrierState(state)
const { hasPassengers, getDestination, isOperable } = useCarrier(state, scene)
const { isPeaceable } = useCasts(state, scene)
/** 進行可能かどうか */
const isEnabled = computed(() => !disabled.value && isOperable(carrier.value) && isPeaceable.value)
/** 上り方向に進行可能 */
const inbound = computed(() => isEnabled.value && coord(carrier.value) <= 0)
/** 下り方向に進行可能 */
const outbound = computed(() => isEnabled.value && coord(carrier.value) >= 0)
/** 出発する */
const leave = async (
  bound: Bound,
) => {
  if (!hasPassengers(carrier.value)) return
  await leaveCarrier(carrier.value, getDestination(carrier.value, bound))
}
</script>

<template>
  <v-menu
    v-model="isEnabled"
    activator="parent"
    :close-on-content-click="false"
    disabled
    location="end center"
    persistent
    transition="scroll-y-transition"
  >
    <div>
      <v-expand-transition mode="out-in">
        <v-btn
          v-show="inbound"
          icon="$inbound"
          color="amber"
          class="ma-1"
          @click.stop="leave('inbound')"
        />
      </v-expand-transition>
    </div>
    <div>
      <v-expand-transition mode="in-out">
        <v-btn
          v-show="outbound"
          icon="$outbound"
          color="amber"
          class="ma-1"
          @click.stop="leave('outbound')"
        />
      </v-expand-transition>
    </div>
  </v-menu>
</template>


<script lang="ts" setup>
import { useAppearance, useCarrier, useCarrierState, useCasts, useScene } from '@/composables';
import { useSceneStore } from '@/stores/scene';
import type { Carrier } from '@/types';
const props = defineProps<{
  state: Carrier
}>()
const { state: carrier } = toRefs(props)
const { state, scene, disabled } = storeToRefs(useSceneStore())
const { coord, leave: leaveCarrier } = useCarrierState(state)
const { hasPassengers, getDestination, isOperable } = useCarrier(state, scene)
const { isPeaceable } = useCasts(state, scene)
const { leave } = useScene(state, scene)
const { gridSize } = useAppearance()
/** 進行可能かどうか */
const isEnabled = computed(() => !disabled.value && isOperable(carrier.value) && isPeaceable.value)
/** 上り方向に進行可能 */
const inbound = computed(() => isEnabled.value && coord(carrier.value) <= 0)
/** 下り方向に進行可能 */
const outbound = computed(() => isEnabled.value && coord(carrier.value) >= 0)
/** オフセット */
const offset = computed(() => -gridSize.value * 0.25)
</script>

<template>
  <v-menu
    v-model="isEnabled"
    activator="parent"
    :close-on-content-click="false"
    disabled
    location="end center"
    :offset="offset"
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
          @click.stop="leave(carrier, 'inbound')"
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
          @click.stop="leave(carrier, 'outbound')"
        />
      </v-expand-transition>
    </div>
  </v-menu>
</template>


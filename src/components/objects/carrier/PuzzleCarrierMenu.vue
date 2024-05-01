<script lang="ts" setup>
import type { Carrier } from '@/types'
import type { Bound } from '@/types/state'
import { useCarrierState, useCarrier, useCasts } from '@/composables'
import { useSceneStore } from '@/stores/scene'
const props = defineProps<{
  state: Carrier
}>()
const store = useSceneStore()
const { coord, leave: leaveCarrier } = useCarrierState(toRef(store.state))
const { hasPassengers, getDestination, isOperable } = useCarrier(toRef(store.state), toRef(store.scene))
const { isPeaceable } = useCasts(toRef(store.state), toRef(store.scene))
/**
 * 進行可能かどうか
 */
const isEnabled = computed(() => !store.disabled && isOperable(props.state) && isPeaceable.value)
/**
 * 上り方向に進行可能
 */
const inbound = computed(() => isEnabled.value && coord(props.state) <= 0)
/**
 * 下り方向に進行可能
 */
const outbound = computed(() => isEnabled.value && coord(props.state) >= 0)
/**
 * 出発する
 */
const leave = async (
  bound: Bound,
) => {
  if (!hasPassengers(props.state)) return
  await leaveCarrier(props.state, getDestination(props.state, bound))
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
          icon="mdi-arrow-up"
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
          icon="mdi-arrow-down"
          color="amber"
          class="ma-1"
          @click.stop="leave('outbound')"
        />
      </v-expand-transition>
    </div>
  </v-menu>
</template>


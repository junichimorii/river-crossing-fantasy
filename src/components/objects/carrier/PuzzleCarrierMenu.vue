<script lang="ts" setup>
import { computed, toRef } from 'vue'
import { useCarrierState, useCarrier, useCasts } from '@/composables'
import { useSceneStore } from '@/store/scene'
import type { Carrier } from '@/types'
import type { Bound } from '@/types/state'
const props = defineProps<{
  state: Carrier
}>()
const store = useSceneStore()
const { coord, leave: leaveCarrier } = useCarrierState(toRef(store.state))
const { hasPassengers, getDestination, isReady } = useCarrier(toRef(store.state), toRef(store.scene))
const { isPeaceable } = useCasts(toRef(store.state), toRef(store.scene))
/**
 * 進行可能かどうか
 */
const isEnabled = computed(() => !store.disabled && isReady(props.state) && isPeaceable.value)
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
    activator="parent"
    :close-on-content-click="false"
    disabled
    location="end top"
    v-model="inbound"
    persistent
    transition="scroll-y-reverse-transition"
  >
    <div class="d-flex justify-center">
      <v-expand-transition mode="out-in">
        <v-btn
          size="default"
          icon="mdi-arrow-up"
          color="tertiary"
          class="ma-1"
          @click="leave('inbound')"
        ></v-btn>
      </v-expand-transition>
    </div>
  </v-menu>
  <v-menu
    activator="parent"
    :close-on-content-click="false"
    disabled
    location="end bottom"
    v-model="outbound"
    persistent
    transition="scroll-y-transition"
  >
    <div class="d-flex justify-center">
      <v-expand-transition mode="in-out">
        <v-btn
          size="default"
          icon="mdi-arrow-down"
          color="tertiary"
          class="ma-1"
          @click="leave('outbound')"
        ></v-btn>
      </v-expand-transition>
    </div>
  </v-menu>
</template>


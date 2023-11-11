<script lang="ts" setup>
import { computed, toRef } from 'vue'
import { useCarrierState, useCarrier, useCasts, useScene } from '@/composables'
import { useSceneStore } from '@/store/scene'
import type { Carrier } from '@/types'
const props = defineProps<{
  state: Carrier
}>()
const store = useSceneStore()
const { coord } = useCarrierState(toRef(store.state))
const { isReady } = useCarrier(toRef(store.state), toRef(store.scene))
const { isPeaceable } = useCasts(toRef(store.state), toRef(store.scene))
const { leave } = useScene(toRef(store.state), toRef(store.scene))

const isEnabled = computed(() => isReady(props.state) && isPeaceable.value && !store.disabled)
/**
 * 上り方向に進行可能
 */
const inbound = computed(() => isEnabled.value && coord(props.state) < 0)
/**
 * 下り方向に進行可能
 */
const outbound = computed(() => isEnabled.value && coord(props.state) > 0)
</script>

<template>
  <v-menu
    activator="parent"
    :close-on-content-click="false"
    disabled
    location="end bottom"
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
          @click="leave(state, 'inbound')"
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
          @click="leave(state, 'outbound')"
        ></v-btn>
      </v-expand-transition>
    </div>
  </v-menu>
</template>


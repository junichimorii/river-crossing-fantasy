<script lang="ts" setup>
import { computed, toRef } from 'vue'
import { useCarrier } from '@/composables'
import { useSceneStore } from '@/store/scene'
import type { Carrier } from '@/types'
const props = defineProps<{
  state: Carrier
}>()
const store = useSceneStore()
const { getDuration, getLoad, hasPassengers } = useCarrier(toRef(store.state), toRef(store.scene))

const text = computed(() => hasPassengers(props.state)
  ? store.scene.category === 'time-limited'
    ? `所要時間: ${getDuration(props.state)}分`
    : store.scene.category === 'weight-limited'
      ? `積載量: ${getLoad(props.state)} / ${props.state.weightLimit}`
      : ''
  : '')
const model = computed(() => !store.disabled && text.value !== '')
</script>

<template>
  <v-tooltip
    disabled
    activator="parent"
    v-model="model"
    location="bottom center"
    content-class="pa-1"
  >
    {{ text }}
  </v-tooltip>
</template>


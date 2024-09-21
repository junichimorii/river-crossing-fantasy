<script lang="ts" setup>
import { useCarrier } from '@/composables';
import { useSceneStore } from '@/stores/scene';
import type { Carrier } from '@/types';
const props = defineProps<{
  state: Carrier
}>()
const { state: carrier } = toRefs(props)
const { state, scene, disabled } = storeToRefs(useSceneStore())
const { getElapsedTime, getLoad, hasPassengers } = useCarrier(state, scene)
const text = computed(() => hasPassengers(carrier.value)
  ? scene.value.casts.some(cast => cast.role.duration)
    ? `所要時間: ${getElapsedTime(carrier.value)}分`
    : scene.value.casts.some(cast => cast.role.weight)
      ? `積載量: ${getLoad(carrier.value)} / ${carrier.value.capacity}`
      : ''
  : '')
const model = computed(() => !disabled.value && text.value !== '')
</script>

<template>
  <v-tooltip
    v-model="model"
    disabled
    activator="parent"
    location="top"
    content-class="pa-1"
  >
    {{ text }}
  </v-tooltip>
</template>


<script lang="ts" setup>
import { useCarrier } from '@/composables';
import { useSceneStore } from '@/stores/scene';
import type { Carrier } from '@/types';
const props = defineProps<{
  state: Carrier
}>()
const { state: carrier } = toRefs(props)
const { state: sceneState, scene, disabled } = storeToRefs(useSceneStore())
const { getElapsedTime, getLoad, hasPassengers } = useCarrier(sceneState, scene)
const text = computed(() => hasPassengers(carrier.value)
  ? scene.value.crews.some(crew => crew.role.duration)
    ? `所要時間: ${getElapsedTime(carrier.value)}分`
    : scene.value.crews.some(crew => crew.role.weight)
      ? `積載量: ${getLoad(carrier.value).toFixed(1)} / ${carrier.value.capacity.toFixed(1)}`
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


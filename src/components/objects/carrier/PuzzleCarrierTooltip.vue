<script lang="ts" setup>
import type { Carrier } from '@/types'
import { useCarrier } from '@/composables'
import { useSceneStore } from '@/store/scene'
const props = defineProps<{
  state: Carrier
}>()
const store = useSceneStore()
const { getElapsedTime, getLoad, hasPassengers } = useCarrier(toRef(store.state), toRef(store.scene))
const text = computed(() => hasPassengers(props.state)
  ? store.scene.casts.some(cast => cast.role.duration)
    ? `所要時間: ${getElapsedTime(props.state)}分`
    : store.scene.casts.some(cast => cast.role.weight)
      ? `積載量: ${getLoad(props.state)} / ${props.state.capacity}`
      : ''
  : '')
const model = computed(() => !store.disabled && text.value !== '')
</script>

<template>
  <v-tooltip
    disabled
    activator="parent"
    v-model="model"
    location="top"
    content-class="pa-1"
  >
    {{ text }}
  </v-tooltip>
</template>


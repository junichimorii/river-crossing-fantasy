<script lang="ts" setup>
import { computed, toRef } from 'vue'
import type { Carrier } from '@/types'
import { useCarrier } from '@/composables'
import { useSceneStore } from '@/store/scene'
const props = defineProps<{
  state: Carrier
}>()
const store = useSceneStore()
const { getDuration, hasPassengers } = useCarrier(toRef(store.state), toRef(store.scene))

const text = computed(() => hasPassengers(props.state)
  ? store.scene.category === 'time-limited'
    ? `所要時間: ${getDuration(props.state)}分`
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


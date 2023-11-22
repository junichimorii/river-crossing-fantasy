<script lang="ts" setup>
import { computed, toRef } from 'vue'
import type { Cast } from '@/types'
import { useAppearance, useCastEmotion } from '@/composables'
import { useSceneStore } from '@/store/scene'
const props = defineProps<{
  state: Cast
}>()
const store = useSceneStore()
const { gridSize } = useAppearance()
const { model, content, color } = useCastEmotion(toRef(store.state), props.state)
const offset = computed(() => gridSize.value * 0.1 * (3 - (props.state.appearance.ratio || 2)))
</script>

<template>
  <v-badge
    :model-value="model"
    :content="content"
    :color="color"
    :offset-x="offset"
    :offset-y="offset"
  >
    <slot></slot>
  </v-badge>
</template>

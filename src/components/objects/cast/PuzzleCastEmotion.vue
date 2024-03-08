<script lang="ts" setup>
import type { Cast } from '@/types'
import { useAppearance, useCast, useCastEmotion } from '@/composables'
import { useSceneStore } from '@/store/scene'
const props = defineProps<{
  state: Cast
}>()
const store = useSceneStore()
const { gridSize } = useAppearance()
const { model, content, color } = useCastEmotion(toRef(store.state), props.state)
const { isRower } = useCast()
const offset = computed(() => gridSize.value * 0.1 * (isRower(props.state) ? 1 : 2))
</script>

<template>
  <v-badge
    :model-value="model"
    :content="content"
    :color="color"
    :offset-x="offset"
    :offset-y="offset"
  >
    <slot />
  </v-badge>
</template>

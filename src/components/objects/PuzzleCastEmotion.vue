<script lang="ts" setup>
import { computed } from 'vue'
import { useAppearance } from '@/composables'
import { useSceneStore } from '@/store/scene'
import type { Cast } from '@/types/cast'
const { state } = defineProps<{
  state: Cast
}>()
const scene = useSceneStore()
const { gridSize } = useAppearance(scene.state)
const emotions = computed(() => Array.from(new Set(state.status.emotions)))
const isScared = computed(() => emotions.value.includes('scared'))  // 怖い、危機に瀕している
const isExcited = computed(() => emotions.value.includes('excited')) // 興奮している、喜んでいる
const isSurprised = computed(() => emotions.value.includes('surprised'))  // 驚いている、困っている
const model = computed(() => emotions.value.length > 0)
const content = computed(() => `${isScared.value?'😰':''}${isExcited.value?'😈':''}${isSurprised.value?'😖':''}`)
const color = computed(() => isExcited.value
  ? 'red-lighten-4'
  : isScared.value
    ? 'blue-lighten-4'
    : isSurprised.value
      ? 'amber-lighten-4'
      : 'white'
)
const offset = computed(() => gridSize.value * 0.1 * (3 - (state.appearance.ratio || 2)))
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

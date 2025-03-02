<script lang="ts" setup>
import { useAppearance, useCrew, useCrewEmotion } from '@/composables';
import { useSceneStore } from '@/stores/scene';
import type { Crew } from '@/types';
const props = defineProps<{
  state: Crew
}>()
const { state: crew } = toRefs(props)
const { state: sceneState } = storeToRefs(useSceneStore())
const { gridSize } = useAppearance()
const { model, content, color } = useCrewEmotion(sceneState, crew)
const { isRower } = useCrew()
const offset = computed(() => gridSize.value * 0.1 * (isRower(crew.value) ? 1 : 2))
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

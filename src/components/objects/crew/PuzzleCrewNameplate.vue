<script lang="ts" setup>
import { useCrew, useCrewState } from '@/composables';
import { useSceneStore } from '@/stores/scene';
import type { Crew } from '@/types';
const props = defineProps<{
  state: Crew
}>()
const { state: crew } = toRefs(props)
const { state: sceneState } = storeToRefs(useSceneStore())
const { coord } = useCrewState(sceneState)
const { isRower } = useCrew()
/** CSS scale */
const scale = computed(() => `${coord(crew.value) > 0 ? -1 : 1} 1`)
/** CSS fontSize */
const fontSize = computed(() => `${1.2 / (isRower(crew.value) ? 1 : 0.85)}vmin`)
</script>

<template>
  <div
    class="text-white"
    style="user-select: none;"
    :style="{ scale, fontSize }"
  >
    {{ crew.name }}
  </div>
</template>

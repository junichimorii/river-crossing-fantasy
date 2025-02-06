<script lang="ts" setup>
import { useCast, useCastState } from '@/composables';
import { useSceneStore } from '@/stores/scene';
import type { Cast } from '@/types';
const props = defineProps<{
  state: Cast
}>()
const { state: cast } = toRefs(props)
const { state: sceneState } = storeToRefs(useSceneStore())
const { coord } = useCastState(sceneState)
const { isRower } = useCast()

/** 文字のスタイル */
const style = computed(() => `font-size: ${1.2 / (isRower(cast.value) ? 1 : 0.85)}vmin; transform: scale(${coord(cast.value) > 0 ? -1 : 1}, 1);`)
</script>

<template>
  <div
    class="text-white"
    style="user-select: none;"
    :style="style"
  >
    {{ cast.name }}
  </div>
</template>

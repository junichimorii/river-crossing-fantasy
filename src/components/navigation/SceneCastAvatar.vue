<script lang="ts" setup>
import sprites from '@/assets/images/casts';
import { useCast } from '@/composables';
import type { Cast } from '@/types';
const { getTransform } = useCast()
const props = defineProps<{
  cast: Cast
}>()
const { cast } = toRefs(props)
const transform = computed(() => getTransform(cast.value, cast.value.coord || -1))
</script>

<template>
  <v-img
    :src="sprites[cast.appearance]"
    lazy-src="@/assets/images/silhouette.webp"
    aspect-ratio="1/2"
    class="puzzle-cast"
    :style="{ transform }"
  />
</template>

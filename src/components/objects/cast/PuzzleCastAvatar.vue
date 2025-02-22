<script lang="ts" setup>
import sprites from '@/assets/images/casts';
import { useCast } from '@/composables';
import type { Cast } from '@/types';
const { getScale } = useCast()
const props = defineProps<{
  state: Cast
}>()
const { state: cast } = toRefs(props)
const scale = computed(() => getScale(cast.value, cast.value.coord || -1))
</script>

<template>
  <v-avatar
    tile
    start
  >
    <v-img
      cover
      :src="sprites[cast.appearance]"
      lazy-src="@/assets/images/silhouette.webp"
      aspect-ratio="1/2"
      class="puzzle-cast"
      :style="{ scale }"
    >
      <slot />
    </v-img>
  </v-avatar>
</template>

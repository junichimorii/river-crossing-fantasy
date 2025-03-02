<script lang="ts" setup>
import sprites from '@/assets/images/crews';
import { useCrew } from '@/composables';
import type { Crew } from '@/types';
const { getScale } = useCrew()
const props = defineProps<{
  state: Crew
}>()
const { state: crew } = toRefs(props)
const scale = computed(() => getScale(crew.value, crew.value.coord || -1))
</script>

<template>
  <v-avatar
    tile
    start
  >
    <v-img
      cover
      :src="sprites[crew.appearance]"
      lazy-src="@/assets/images/silhouette.webp"
      aspect-ratio="1/2"
      class="puzzle-crew"
      :style="{ scale }"
    >
      <slot />
    </v-img>
  </v-avatar>
</template>

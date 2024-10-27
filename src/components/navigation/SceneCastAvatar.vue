<script lang="ts" setup>
import sprites from '@/assets/images/casts';
import { useCast } from '@/composables';
import type { Cast } from '@/types'
const { getTransform } = useCast()
defineProps<{
  cast: Cast
}>()
</script>

<template>
  <v-img
    :src="sprites[cast.appearance]"
    :style="{ transform: getTransform(cast, cast.coord || -1) }"
    style="transform-origin: bottom center;"
  />
</template>

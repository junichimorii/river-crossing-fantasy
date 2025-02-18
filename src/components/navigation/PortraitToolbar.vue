<script lang="ts" setup>
import { useAppearance } from '@/composables';
const { toolbarHeight } = useAppearance()
const { isSupported, orientation } = useScreenOrientation()
</script>

<template>
  <v-toolbar
    v-show="isSupported && orientation === 'portrait-primary'"
    title="River Crossing Fantasy"
    :height="toolbarHeight"
    class="decorated-header"
  />
</template>

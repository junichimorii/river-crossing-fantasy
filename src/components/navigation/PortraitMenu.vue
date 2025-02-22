<script lang="ts" setup>
import { useAppearance } from '@/composables';
const { navigationHeight } = useAppearance()
const { isSupported, orientation } = useScreenOrientation()
</script>

<template>
  <SceneNavigation
    v-if="isSupported && orientation === 'portrait-primary'"
    :height="navigationHeight"
  />
</template>

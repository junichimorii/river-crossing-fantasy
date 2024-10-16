<script lang="ts" setup>
import { useAppearance } from '@/composables';
import { useSceneStore } from '@/stores/scene';
const { scene } = storeToRefs(useSceneStore())
const { toolbarHeight } = useAppearance()
const { isSupported, orientation } = useScreenOrientation()
</script>

<template>
  <v-toolbar
    v-show="isSupported && orientation === 'portrait-primary'"
    title="River Crossing Fantasy"
    style="font-family: 'Architects Daughter', cursive;"
    color="secondary"
  />
</template>

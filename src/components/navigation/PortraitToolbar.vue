<script lang="ts" setup>
import { useSceneStore } from '@/stores/scene';
const { scene } = storeToRefs(useSceneStore())
const { isSupported, orientation } = useScreenOrientation()
</script>

<template>
  <v-app-bar
    v-if="isSupported && orientation === 'portrait-primary'"
    app
    :title="scene.title"
  />
</template>

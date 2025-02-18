<script lang="ts" setup>
import { useSceneStore } from '@/stores/scene';
const { scene } = storeToRefs(useSceneStore())
</script>

<template>
  <v-toolbar
    absolute
    density="compact"
    class="bg-transparent"
  >
    <SceneToolbarMoves />
    <SceneSoundAndSplash />
    <SceneToolbarNavigation />
    <SceneToolbarSolve :scene="scene" />
  </v-toolbar>
</template>

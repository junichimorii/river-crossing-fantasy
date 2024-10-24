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
    <SceneMovesButton />
    <SceneSoundButton />
    <SceneNavigationButton />
    <SceneSolveButton />
  </v-toolbar>
  <SceneSolveDialog :scene="scene" />
</template>

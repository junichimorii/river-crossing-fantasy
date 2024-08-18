<script lang="ts" setup>
import { useAppearance } from '@/composables';
import { useSceneStore } from '@/stores/scene';
const { scene } = storeToRefs(useSceneStore())
const { navigationHeight } = useAppearance()
</script>

<template>
  <v-card
    :title="scene.title"
    :height="navigationHeight"
    class="overflow-y-auto"
  >
    <SceneActions />
    <v-divider />
    <SceneRules />
    <SceneCasts />
    <v-divider />
    <SceneSettings />
  </v-card>
</template>

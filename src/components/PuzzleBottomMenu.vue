<script lang="ts" setup>
import { useAppearance } from '@/composables';
import { useSceneStore } from '@/stores/scene';
const { scene } = storeToRefs(useSceneStore())
const { navigationHeight } = useAppearance()
const { isSupported, orientation } = useScreenOrientation()
</script>

<template>
  <v-card
    v-if="isSupported && orientation === 'portrait-primary'"
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

<script lang="ts" setup>
import { useSceneStore } from '@/stores/scene';
const { scene } = storeToRefs(useSceneStore())
</script>

<template>
  <v-card
    flat
    :title="scene.title"
    class="overflow-y-auto"
  >
    <template #append>
      <slot name="append" />
    </template>
    <slot name="top-action" />
    <v-divider />
    <v-card-text>
      <SceneNavigationRules />
      <SceneNavigationCrews />
      <v-divider />
      <SettingsMenu />
    </v-card-text>
    <slot name="bottom-action" />
  </v-card>
</template>

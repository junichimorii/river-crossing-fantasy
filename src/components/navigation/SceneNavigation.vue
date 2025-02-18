<script lang="ts" setup>
import { useSceneStore } from '@/stores/scene';
const { scene } = storeToRefs(useSceneStore())
</script>

<template>
  <v-card class="overflow-y-auto">
    <v-toolbar
      :title="scene.title"
      class="bg-transparent"
    >
      <template #append>
        <slot name="toolbar-action" />
      </template>
    </v-toolbar>
    <slot name="top-action" />
    <v-divider />
    <v-card-text class="pa-1">
      <SceneNavigationRules />
      <SceneNavigationCasts />
      <v-divider />
      <SettingsMenu />
    </v-card-text>
    <v-divider />
    <slot name="bottom-action" />
  </v-card>
</template>

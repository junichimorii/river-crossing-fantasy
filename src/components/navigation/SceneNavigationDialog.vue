<script lang="ts" setup>
import { useSceneStore } from '@/stores/scene';
import { useSessionStore } from '@/stores/session';
const { scene } = storeToRefs(useSceneStore())
const { state: session } = storeToRefs(useSessionStore())
</script>

<template>
  <v-dialog
    v-model="session.navigation"
    scrollable
    :retain-focus="false"
    class="d-flex justify-center align-center"
  >
    <v-card class="overflow-y-auto opacity-90">
      <v-toolbar
        :title="scene.title"
        class="bg-transparent"
      >
        <template #append>
          <v-btn
            icon="$close"
            variant="text"
            color="primary"
            @click.stop="session.navigation=false"
          />
        </template>
      </v-toolbar>
      <v-divider />
      <v-card-text class="pa-1">
        <SceneRules />
        <SceneCasts />
        <v-divider />
        <SceneSettings />
      </v-card-text>
      <v-divider />
      <SceneActions />
    </v-card>
  </v-dialog>
</template>

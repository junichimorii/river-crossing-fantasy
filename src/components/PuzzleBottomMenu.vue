<script lang="ts" setup>
import { SceneNavigationTabs, SceneNavigationWindows } from '@/components'
import { useSceneStore } from '@/store/scene'
const store = useSceneStore()
</script>

<template>
  <v-card
    flat
    :title="store.scene.title"
    class="overflow-y-auto"
  >
    <v-divider></v-divider>
    <v-card-text class="pa-1">
      <SceneNavigationTabs></SceneNavigationTabs>
      <SceneNavigationWindows></SceneNavigationWindows>
    </v-card-text>
    <template v-slot:prepend>
      <v-chip
        rounded
        :color="store.scene.category"
      >
        Q{{store.scene.id}}
      </v-chip>
    </template>
  </v-card>
</template>
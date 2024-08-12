<script lang="ts" setup>
import { useSceneStore } from '@/stores/scene';
import { useSessionStore } from '@/stores/session';
const store = useSceneStore()
const session = useSessionStore()
</script>

<template>
  <v-window
    v-model="session.state.tab"
    disabled
  >
    <v-window-item>
      <SceneRules
        :scene="store.scene"
      />
    </v-window-item>
    <v-window-item>
      <SceneCasts
        :casts="store.scene.casts"
      />
    </v-window-item>
    <v-window-item>
      <SceneMoves
        :moves="store.moves"
        :category="store.scene.category"
      />
    </v-window-item>
    <v-window-item>
      <SceneMenu />
    </v-window-item>
  </v-window>
</template>

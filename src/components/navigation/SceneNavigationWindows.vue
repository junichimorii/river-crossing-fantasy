<script lang="ts" setup>
import { SceneCasts, SceneMenu, SceneMoves, SceneRules } from '@/components'
import { useSceneStore } from '@/store/scene'
import { useSessionStore } from '@/store/session'
const store = useSceneStore()
const session = useSessionStore()
</script>

<template>
  <v-window
    disabled
    v-model="session.state.tab"
  >
    <v-window-item>
      <SceneRules
        :scene="store.scene"
      ></SceneRules>
    </v-window-item>
    <v-window-item>
      <SceneCasts
        :casts="store.scene.casts"
      ></SceneCasts>
    </v-window-item>
    <v-window-item>
      <SceneMoves
        :moves="store.moves"
        :category="store.scene.category"
      ></SceneMoves>
    </v-window-item>
    <v-window-item>
      <SceneMenu></SceneMenu>
    </v-window-item>
  </v-window>
</template>
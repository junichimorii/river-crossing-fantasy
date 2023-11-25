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
      <v-card-subtitle>
        <v-icon>mdi-help</v-icon>
        ルール
      </v-card-subtitle>
      <SceneRules
        :scene="store.scene"
      ></SceneRules>
    </v-window-item>
    <v-window-item>
      <v-card-subtitle>
        <v-icon>mdi-account-multiple</v-icon>
        登場人物
      </v-card-subtitle>
      <SceneCasts
        :casts="store.scene.casts"
      ></SceneCasts>
    </v-window-item>
    <v-window-item>
      <v-card-subtitle>
        <v-icon>mdi-history</v-icon>
        履歴
      </v-card-subtitle>
      <SceneMoves
        :moves="store.moves"
        :category="store.scene.category"
      ></SceneMoves>
    </v-window-item>
    <v-window-item>
      <v-card-subtitle>
        <v-icon>mdi-cog</v-icon>
        オプション
      </v-card-subtitle>
      <SceneMenu></SceneMenu>
    </v-window-item>
  </v-window>
</template>
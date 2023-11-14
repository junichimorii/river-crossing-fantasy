<script lang="ts" setup>
import { toRef } from 'vue'
import { SceneCasts, SceneConditions, SceneMenu, SceneMoves, SceneSolve } from '@/components'
import { useMoves } from '@/composables'
import { useSceneStore } from '@/store/scene'
import { useSessionStore } from '@/store/session'
const session = useSessionStore()
const store = useSceneStore()
const { count, color } = useMoves(toRef(store.moves), toRef(store.scene))
</script>

<template>
  <v-navigation-drawer
    v-model="session.state.drawer"
    temporary
    location="right"
  >
    <v-card
      flat
      :title="store.scene.title"
    >
      <template v-slot:prepend>
        <v-chip
          rounded
          :color="store.scene.category"
        >
          Q{{store.scene.id}}
        </v-chip>
      </template>
      <v-divider></v-divider>
      <v-expansion-panels
        variant="accordion"
      >
        <v-expansion-panel>
          <v-expansion-panel-title>
            <v-icon>mdi-help</v-icon>
            条件
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <SceneConditions
              :scene="store.scene"
            ></SceneConditions>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-title>
            <v-icon>mdi-account-multiple</v-icon>
            登場人物
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <SceneCasts
              :casts="store.scene.casts"
            ></SceneCasts>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-title>
            <v-badge
              :model-value="count > 0"
              :content="count"
              :color="color"
              offset-x="-6"
            >
              <v-icon>mdi-history</v-icon>
            </v-badge>
            履歴
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <SceneMoves
              :moves="store.moves"
              :category="store.scene.category"
            ></SceneMoves>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-title>
            <v-icon>mdi-cog</v-icon>
            オプション
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <SceneMenu></SceneMenu>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-title>
            <v-icon icon="mdi-map-search"></v-icon>
            ルート探索
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <SceneSolve
              :scene="store.scene"
            ></SceneSolve>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-navigation-drawer>
</template>
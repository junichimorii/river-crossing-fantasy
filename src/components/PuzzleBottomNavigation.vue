<script lang="ts" setup>
import { ref, toRef } from 'vue'
import { SceneCasts, SceneConditions, SceneMenu, SceneMoves, SceneSolve } from '@/components'
import { useMoves } from '@/composables'
import { useRecordsStore } from '@/store/records'
import { useSceneStore } from '@/store/scene'
import { useSessionStore } from '@/store/session'
const records = useRecordsStore()
const store = useSceneStore()
const session = useSessionStore()
const { count, color } = useMoves(toRef(store.moves), toRef(store.scene))
const tab = ref(null)
</script>

<template>
  <v-card
    flat
    :title="store.scene.title"
    class="overflow-y-auto"
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
    <v-tabs
      v-model="tab"
      align-tabs="center"
      stacked
    >
      <v-tab value="conditions">
        <v-icon>mdi-help</v-icon>
        条件
      </v-tab>
      <v-tab value="casts">
        <v-icon>mdi-account-multiple</v-icon>
        登場人物
      </v-tab>
      <v-tab value="history">
        <v-badge
          :model-value="count > 0"
          :content="count"
          :color="color"
          offset-x="-6"
        >
          <v-icon>mdi-history</v-icon>
        </v-badge>
        履歴
      </v-tab>
      <v-tab value="menu">
        <v-icon>mdi-cog</v-icon>
        オプション
      </v-tab>
    </v-tabs>
    <v-card-text
      class="pa-1"
    >
      <v-window v-model="tab">
        <v-window-item value="conditions">
          <SceneConditions
            :scene="store.scene"
          ></SceneConditions>
        </v-window-item>
        <v-window-item value="casts">
          <SceneCasts
            :casts="store.scene.casts"
          ></SceneCasts>
        </v-window-item>
        <v-window-item value="history">
          <SceneMoves
            :moves="store.moves"
            :category="store.scene.category"
          ></SceneMoves>
        </v-window-item>
        <v-window-item value="menu">
          <SceneMenu></SceneMenu>
          <v-divider class="my-4"></v-divider>
          <v-btn
            block
            color="info"
            size="large"
            prepend-icon="mdi-map-search"
            :disabled="!records.isCleared(store.scene.id)"
            @click.stop="session.state.solve = true"
          >
            ルート探索
          </v-btn>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
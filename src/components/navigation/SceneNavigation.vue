<script lang="ts" setup>
import { useScreenOrientation } from '@vueuse/core'
import { toRef } from 'vue'
import { SceneCasts, SceneConditions, SceneMenu, SceneMoves } from '@/components'
import { useMoves } from '@/composables'
import { useSceneStore } from '@/store/scene'
import { useSessionStore } from '@/store/session'
const { isSupported, orientation } = useScreenOrientation()
const store = useSceneStore()
const session = useSessionStore()
const { count, color } = useMoves(toRef(store.moves), toRef(store.scene))
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
      v-if="isSupported && orientation === 'portrait-primary'"
      v-model="session.state.navigation"
      align-tabs="center"
      density="compact"
      stacked
      class="mb-1"
    >
      <v-tab>
        <v-icon>mdi-help</v-icon>
        条件
      </v-tab>
      <v-tab>
        <v-icon>mdi-account-multiple</v-icon>
        登場人物
      </v-tab>
      <v-tab>
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
      <v-tab>
        <v-icon>mdi-cog</v-icon>
        オプション
      </v-tab>
    </v-tabs>
    <v-card-item
      v-if="isSupported && orientation === 'landscape-primary'"
      class="d-flex justify-center"
    >
      <v-btn-toggle
        v-model="session.state.navigation"
        rounded="0"
      >
        <v-btn icon="mdi-help"></v-btn>
        <v-btn icon="mdi-account-multiple"></v-btn>
        <v-btn icon="mdi-history"></v-btn>
        <v-btn icon="mdi-cog"></v-btn>
      </v-btn-toggle>
    </v-card-item>
    <v-card-text
      class="pa-0"
    >
      <v-window
        disabled
        v-model="session.state.navigation"
      >
        <v-window-item>
          <v-card-subtitle>
            <v-icon>mdi-help</v-icon>
            条件
          </v-card-subtitle>
          <SceneConditions
            :scene="store.scene"
          ></SceneConditions>
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
    </v-card-text>
  </v-card>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useScreenOrientation } from '@vueuse/core'
import { SceneCasts, SceneConditions, SceneController, SceneHistory, SceneResult, SceneSplash } from '@/components'
import { useStage } from '@/composables'
import { usePuzzleStore } from '@/store/puzzle'
const { isSupported, orientation } = useScreenOrientation()
const puzzle = usePuzzleStore()
const { navigationHeight } = useStage(puzzle.scene)
const tab = ref(null)
/** ボトムナビゲーションを表示 */
const active = computed(() => orientation.value === 'portrait-primary')
</script>

<template>
  <v-card
    flat
    :title="puzzle.scene.title"
    :height="navigationHeight"
    class="overflow-y-auto"
  >
    <template v-slot:prepend>
      <v-chip
        rounded
        :color="puzzle.scene.category"
      >
        Q{{puzzle.scene.id}}
      </v-chip>
    </template>
    <v-divider></v-divider>
    <v-card-text
      class="pa-1"
    >
      <v-window v-model="tab">
        <v-window-item value="conditions">
          <SceneConditions></SceneConditions>
        </v-window-item>
        <v-window-item value="casts">
          <SceneCasts></SceneCasts>
        </v-window-item>
        <v-window-item value="history">
          <SceneHistory></SceneHistory>
        </v-window-item>
        <v-window-item value="console">
          <SceneController></SceneController>
        </v-window-item>
      </v-window>
    </v-card-text>
    <v-bottom-navigation
      color="primary"
      :active="active"
      v-model="tab"
    >
      <v-btn value="conditions">
        <v-icon>mdi-help</v-icon>
        <span>条件</span>
      </v-btn>
      <v-btn value="casts">
        <v-icon>mdi-account-multiple</v-icon>
        <span>登場人物</span>
      </v-btn>
      <v-btn value="history">
        <v-icon>mdi-history</v-icon>
        <span>履歴</span>
      </v-btn>
      <v-btn value="console">
        <v-icon>mdi-cog</v-icon>
        <span>オプション</span>
      </v-btn>
    </v-bottom-navigation>
    <SceneSplash></SceneSplash>
    <SceneResult></SceneResult>
  </v-card>
</template>
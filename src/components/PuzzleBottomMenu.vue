<script lang="ts" setup>
import { useSessionStore } from '@/stores/session';
const session = useSessionStore()
</script>

<template>
  <v-card
    flat
    class="overflow-y-auto"
  >
    <v-tabs
      v-model="session.state.tab"
      align-tabs="center"
      stacked
    >
      <v-tab>
        <v-icon>$help</v-icon>
        ルール
      </v-tab>
      <v-tab>
        <v-icon>$casts</v-icon>
        登場人物
      </v-tab>
      <v-tab>
        <v-icon>$moves</v-icon>
        履歴
      </v-tab>
      <v-tab>
        <v-icon>$settings</v-icon>
        オプション
      </v-tab>
    </v-tabs>
    <v-card-text class="pa-1">
      <SceneNavigationWindows />
    </v-card-text>
  </v-card>
</template>

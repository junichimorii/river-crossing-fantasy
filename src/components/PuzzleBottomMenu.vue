<script lang="ts" setup>
import { useSessionStore } from '@/stores/session';
const session = useSessionStore()
</script>

<template>
  <v-card
    flat
    class="overflow-y-auto"
  >
    <v-card-text class="pa-1">
      <SceneNavigationWindows />
    </v-card-text>
    <v-bottom-navigation
      v-model="session.state.tab"
      active
      color="primary"
    >
      <v-btn>
        <v-icon>$help</v-icon>
        ルール
      </v-btn>
      <v-btn>
        <v-icon>$casts</v-icon>
        登場人物
      </v-btn>
      <v-btn>
        <v-icon>$moves</v-icon>
        履歴
      </v-btn>
      <v-btn>
        <v-icon>$settings</v-icon>
        オプション
      </v-btn>
    </v-bottom-navigation>
  </v-card>
</template>

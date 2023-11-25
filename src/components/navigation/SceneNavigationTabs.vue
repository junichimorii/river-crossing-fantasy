<script lang="ts" setup>
import { toRef } from 'vue'
import { useMoves } from '@/composables'
import { useSceneStore } from '@/store/scene'
import { useSessionStore } from '@/store/session'
const store = useSceneStore()
const session = useSessionStore()
const { count, color } = useMoves(toRef(store.moves), toRef(store.scene))
</script>

<template>
  <v-tabs
    v-model="session.state.tab"
    align-tabs="center"
    density="compact"
    stacked
    class="mb-1"
  >
    <v-tab>
      <v-icon>mdi-help</v-icon>
      ルール
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
</template>
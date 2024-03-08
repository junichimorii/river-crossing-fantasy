<script lang="ts" setup>
import { useSceneStore } from '@/store/scene'
import { useSessionStore } from '@/store/session'
import { useSettingsStore } from '@/store/settings'
const settings = useSettingsStore()
const store = useSceneStore()
const session = useSessionStore()
</script>

<template>
  <v-card
    flat
    title="オプション"
    class="bg-transparent"
  >
    <template #prepend>
      <v-icon>mdi-cog</v-icon>
    </template>
    <v-list
      class="bg-transparent"
    >
      <v-list-item>
        <v-btn
          block
          color="warning"
          size="large"
          prepend-icon="mdi-check-circle"
          @click.stop="store.init();session.state.navigation=false"
        >
          最初から始める
        </v-btn>
      </v-list-item>
      <v-list-item>
        <v-btn
          block
          color="success"
          size="large"
          prepend-icon="mdi-home"
          to="/home"
        >
          パズル一覧に戻る
        </v-btn>
      </v-list-item>
      <v-divider class="my-4" />
      <v-card-subtitle>
        <v-icon>mdi-cog</v-icon>
        設定
      </v-card-subtitle>
      <v-list-subheader>
        BGM音量
      </v-list-subheader>
      <v-list-item>
        <v-slider
          v-model="settings.state.sound.volume"
          color="primary"
          :max="1"
          :min="0"
          :step="0.05"
          prepend-icon="mdi-volume-high"
          class="py-1"
        />
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script lang="ts" setup>
import { useSceneStore } from '@/stores/scene';
import { useSessionStore } from '@/stores/session';
import { useSettingsStore } from '@/stores/settings';
const settings = useSettingsStore()
const { init } = useSceneStore()
const session = useSessionStore()
</script>

<template>
  <v-card
    flat
    title="オプション"
    class="bg-transparent"
  >
    <template #prepend>
      <v-icon>$settings</v-icon>
    </template>
    <v-list
      class="bg-transparent"
    >
      <v-list-item>
        <v-btn
          block
          color="warning"
          size="large"
          prepend-icon="$success"
          @click.stop="init();session.state.navigation=false"
        >
          最初から始める
        </v-btn>
      </v-list-item>
      <v-list-item>
        <v-btn
          block
          color="success"
          size="large"
          prepend-icon="$home"
          to="/home"
        >
          パズル一覧に戻る
        </v-btn>
      </v-list-item>
      <v-divider class="my-4" />
      <v-card-subtitle>
        <v-icon>$settings</v-icon>
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
          prepend-icon="$volume"
          class="py-1"
        />
      </v-list-item>
    </v-list>
  </v-card>
</template>

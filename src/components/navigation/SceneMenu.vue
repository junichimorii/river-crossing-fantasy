<script lang="ts" setup>
import { useSceneStore } from '@/store/scene'
import { useSettingsStore } from '@/store/settings'
const settings = useSettingsStore()
const store = useSceneStore()
</script>

<template>
  <v-list>
    <v-list-item>
      <v-btn
        block
        color="warning"
        size="large"
        prepend-icon="mdi-check-circle"
        @click.stop="store.init()"
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
    <v-divider class="my-4"></v-divider>
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
      ></v-slider>
    </v-list-item>
  </v-list>
</template>
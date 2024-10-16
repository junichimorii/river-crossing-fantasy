<script lang="ts" setup>
import { useSettingsStore } from '@/stores/settings';
const { state: settings } = storeToRefs(useSettingsStore())
</script>

<template>
  <v-card
    flat
    prepend-icon="$settings"
    title="設定"
  >
    <v-list>
      <v-list-item>
        <v-slider
          v-model="settings.sound.volume"
          label="BGM音量"
          prepend-icon="$volume"
          color="primary"
          :max="1"
          :min="0"
          :step="0.05"
        />
      </v-list-item>
    </v-list>
  </v-card>
</template>

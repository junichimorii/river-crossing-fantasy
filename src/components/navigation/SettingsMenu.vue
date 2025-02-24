<script lang="ts" setup>
import { useSettingsStore } from '@/stores/settings';
const { state: settings } = storeToRefs(useSettingsStore())
</script>

<template>
  <v-card flat>
    <div class="text-subtitle-1">
      <v-icon icon="$settings" />
      設定
    </div>
    <v-slider
      v-model="settings.sound.volume"
      label="BGM音量"
      prepend-icon="$volume"
      color="primary"
      :max="1"
      :min="0"
      :step="0.05"
    />
  </v-card>
</template>

<script lang="ts" setup>
import type { Scene } from '@/types'
defineProps<{
  scene: Scene
}>()
</script>

<template>
  <v-list>
    <v-list-subheader>
      <v-icon icon="mdi-lock-open"></v-icon>
      クリア条件
    </v-list-subheader>
    <v-list-item class="text-subtitle-2">
      <div v-html="scene.description.conditions"></div>
    </v-list-item>
    <v-list-subheader>
      <v-icon icon="mdi-swap-vertical"></v-icon>
      移動手段
    </v-list-subheader>
    <v-list-item class="text-subtitle-2">
      <div v-html="scene.description.transportation"></div>
    </v-list-item>
    <v-list-subheader
      v-if="scene.description.tips"
    >
      <v-icon icon="mdi-chat-alert"></v-icon>
      Tips
    </v-list-subheader>
    <v-list-item
      v-for="(tips, i) in scene.description.tips"
      :key="i"
      class="text-subtitle-2 py-0"
    >
      <div v-html="tips"></div>
    </v-list-item>
  </v-list>
</template>
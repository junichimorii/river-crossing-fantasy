<script lang="ts" setup>
import type { Scene } from '@/types'
import { convert } from '@/composables/use-text'
defineProps<{
  scene: Scene
}>()
</script>

<template>
  <v-list
    class="bg-transparent"
  >
    <v-list-subheader>
      <v-icon icon="mdi-lock-open"></v-icon>
      クリア条件
    </v-list-subheader>
    <v-list-item class="text-subtitle-2">
      <div
        v-for="(rule, i) in scene.rules.conditions"
        :key="i"
        class="d-flex align-self-center"
      >
        <v-rating
          readonly
          density="compact"
          :length="2"
          :size="20"
          :model-value="i + 1"
          active-color="orange"
        />
        <span
          v-html="convert(rule)"
          class="ml-3"
        ></span>
      </div>
    </v-list-item>
    <v-list-subheader>
      <v-icon icon="mdi-swap-vertical"></v-icon>
      移動手段
    </v-list-subheader>
    <v-list-item class="text-subtitle-2">
      <div v-html="convert(scene.rules.transportation)"></div>
    </v-list-item>
    <v-list-subheader
      v-if="scene.rules.tips"
    >
      <v-icon icon="mdi-chat-alert"></v-icon>
      Tips
    </v-list-subheader>
    <v-list-item
      class="text-subtitle-2 py-0"
    >
      <div
        v-for="(tips, i) in scene.rules.tips"
        :key="i"
        v-html="convert(tips)"
      ></div>
    </v-list-item>
  </v-list>
</template>
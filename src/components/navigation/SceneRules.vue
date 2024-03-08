<script lang="ts" setup>
import type { Scene } from '@/types'
import { convert } from '@/composables/use-text'
defineProps<{
  scene: Scene
}>()
</script>

<template>
  <v-card
    flat
    title="ルール"
    class="bg-transparent"
  >
    <template #prepend>
      <v-icon>mdi-help</v-icon>
    </template>
    <v-list
      class="bg-transparent"
    >
      <v-list-subheader>
        <v-icon icon="mdi-lock-open" />
        クリア条件
      </v-list-subheader>
      <v-list-item class="text-subtitle-2">
        <div
          v-for="(rule, i) in scene.rules.conditions"
          :key="i"
          class="d-flex align-self-end"
        >
          <v-rating
            readonly
            density="compact"
            :length="2"
            :size="20"
            :model-value="i + 1"
            active-color="orange"
          />
          <!-- eslint-disable vue/no-v-html -->
          <span
            class="ml-3"
            v-html="convert(rule)"
          />
          <!-- eslint-enable -->
        </div>
      </v-list-item>
      <v-list-subheader>
        <v-icon icon="mdi-swap-vertical" />
        移動手段
      </v-list-subheader>
      <v-list-item class="text-subtitle-2">
        <!-- eslint-disable vue/no-v-html -->
        <div v-html="convert(scene.rules.transportation)" />
        <!-- eslint-enable -->
      </v-list-item>
      <v-list-subheader
        v-if="scene.rules.tips"
      >
        <v-icon icon="mdi-chat-alert" />
        Tips
      </v-list-subheader>
      <v-list-item
        class="text-subtitle-2 py-0"
      >
        <div
          v-for="(tips, i) in scene.rules.tips"
          :key="i"
          v-html="convert(tips)"
        />
      </v-list-item>
    </v-list>
  </v-card>
</template>
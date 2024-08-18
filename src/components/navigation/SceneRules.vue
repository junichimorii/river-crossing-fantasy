<script lang="ts" setup>
import { convert } from '@/composables/use-text';
import { useSceneStore } from '@/stores/scene';
const { scene } = useSceneStore()
</script>

<template>
  <v-card
    flat
    prepend-icon="$story"
    title="ルール"
  >
    <v-list>
      <v-list-item>
        <v-list-item-title class="text-subtitle-1">
          <v-icon icon="$conditions" />
          クリア条件
        </v-list-item-title>
        <div
          v-for="(rule, i) in scene.rules.conditions"
          :key="i"
          class="d-flex align-self-end text-subtitle-2"
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
      <v-list-item>
        <v-list-item-title class="text-subtitle-1">
          <v-icon icon="$transportation" />
          移動手段
        </v-list-item-title>
        <!-- eslint-disable vue/no-v-html -->
        <div
          class="text-subtitle-2"
          v-html="convert(scene.rules.transportation)"
        />
        <!-- eslint-enable -->
      </v-list-item>
      <v-list-item v-if="scene.rules.tips">
        <v-list-item-title class="text-subtitle-1">
          <v-icon icon="$tips" />
          Tips
        </v-list-item-title>
        <!-- eslint-disable vue/no-v-html -->
        <div
          v-for="(tips, i) in scene.rules.tips"
          :key="i"
          class="text-subtitle-2"
          v-html="convert(tips)"
        />
        <!-- eslint-enable -->
      </v-list-item>
    </v-list>
  </v-card>
</template>

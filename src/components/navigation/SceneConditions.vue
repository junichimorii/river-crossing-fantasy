<script lang="ts" setup>
import { usePuzzleStore } from '@/store/puzzle'
const puzzle = usePuzzleStore()
</script>

<template>
  <v-list class="bg-transparent">
    <v-list-subheader sticky>
      <v-icon icon="mdi-lock-open"></v-icon>
      クリア条件
    </v-list-subheader>
    <v-list-item class="text-subtitle-2">
      {{ puzzle.scene.description.conditions }}
    </v-list-item>
    <v-list-subheader sticky>
      <v-icon icon="mdi-swap-vertical"></v-icon>
      移動手段
    </v-list-subheader>
    <v-list-item class="text-subtitle-2">
      {{ puzzle.scene.description.transportation }}
    </v-list-item>
    <v-list-subheader
      v-if="puzzle.scene.tips"
      sticky
    >
      <v-icon icon="mdi-chat-alert"></v-icon>
      Tips
    </v-list-subheader>
    <v-list-item
      v-for="(tips, i) in puzzle.scene.tips"
      :key="i"
      class="text-subtitle-2 py-0"
    >
      {{ tips }}
    </v-list-item>
  </v-list>
</template>
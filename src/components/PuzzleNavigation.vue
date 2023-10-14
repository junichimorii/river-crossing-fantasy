<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useWindowSize, useElementSize } from '@vueuse/core'
import { useSceneStore } from '@/store/scene'
import { PuzzleConditions, PuzzleController, PuzzleHistory } from '@/components'
const target = ref<HTMLElement | null>(null)
const scene = useSceneStore()
const { width: windowWidth, height: windowHeight } = useWindowSize()
const { width: elementWidth, height: elementHeight } = useElementSize(target)
const tab = ref(null)
/**
 * コンテンツの高さ
 */
const contentsHeight = computed(() => windowHeight.value - scene.stageSize - elementHeight.value)
</script>

<template>
  <v-window v-model="tab">
    <v-window-item value="conditions">
      <PuzzleConditions :max-height="contentsHeight"></PuzzleConditions>
    </v-window-item>
    <v-window-item value="history">
      <PuzzleHistory :max-height="contentsHeight"></PuzzleHistory>
    </v-window-item>
    <v-window-item value="console">
      <PuzzleController :max-height="contentsHeight"></PuzzleController>
    </v-window-item>
  </v-window>
  <v-bottom-navigation ref="target" color="green">
    <v-tabs
      v-model="tab"
      centered
      stacked
    >
      <v-tab value="conditions">
        <v-icon>mdi-help</v-icon>
        <span>問題</span>
      </v-tab>
      <v-tab value="history">
        <v-icon>mdi-history</v-icon>
        <span>履歴</span>
      </v-tab>
      <v-tab value="console">
        <v-icon>mdi-cog</v-icon>
        <span>設定</span>
      </v-tab>
    </v-tabs>
  </v-bottom-navigation>
</template>
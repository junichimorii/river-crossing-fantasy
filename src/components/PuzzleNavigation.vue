<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useElementSize, useScreenOrientation, useWindowSize } from '@vueuse/core'
import { useSceneStore } from '@/store/scene'
import { SceneConditions, SceneController, SceneHistory, SceneResult } from '@/components'
const target = ref<HTMLElement | null>(null)
const scene = useSceneStore()
const { width: windowWidth, height: windowHeight } = useWindowSize()
const { width: elementWidth, height: elementHeight } = useElementSize(target)
const { isSupported, orientation } = useScreenOrientation()
const tab = ref(null)
/** コンテンツの高さ */
const contentsHeight = computed(() => windowHeight.value - scene.stageSize - elementHeight.value)
/** ボトムナビゲーションを表示 */
const active = computed(() => orientation.value === 'portrait-primary')
</script>

<template>
  <div>
    <v-window v-model="tab">
      <v-window-item value="conditions">
        <SceneConditions :max-height="contentsHeight"></SceneConditions>
      </v-window-item>
      <v-window-item value="history">
        <SceneHistory :max-height="contentsHeight"></SceneHistory>
      </v-window-item>
      <v-window-item value="console">
        <SceneController :max-height="contentsHeight"></SceneController>
      </v-window-item>
    </v-window>
    <v-bottom-navigation
      ref="target"
      color="green"
      :active="active"
    >
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
    <SceneResult></SceneResult>
  </div>
</template>
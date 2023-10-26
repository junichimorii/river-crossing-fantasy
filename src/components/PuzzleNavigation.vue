<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useScreenOrientation } from '@vueuse/core'
import { useSceneStore } from '@/store/scene'
import { SceneConditions, SceneController, SceneHistory, SceneResult, SceneSplash } from '@/components'
const scene = useSceneStore()
const { isSupported, orientation } = useScreenOrientation()
const tab = ref(null)
/** コンテンツの高さ */
const contentsHeight = computed(() => scene.navigationHeight - 56)
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
      color="green"
      :active="active"
      v-model="tab"
    >
      <v-btn value="conditions">
        <v-icon>mdi-help</v-icon>
        <span>問題</span>
      </v-btn>
      <v-btn value="history">
        <v-icon>mdi-history</v-icon>
        <span>履歴</span>
      </v-btn>
      <v-btn value="console">
        <v-icon>mdi-cog</v-icon>
        <span>設定</span>
      </v-btn>
    </v-bottom-navigation>
    <SceneSplash></SceneSplash>
    <SceneResult></SceneResult>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { TransitionPresets, useTransition } from '@vueuse/core'
import { PuzzleCast } from '@/components'
import { useSceneStore } from '@/store/scene'
import type { Carrier } from '@/types/carrier'
const { state } = defineProps<{
  state: Carrier
}>()
const scene = useSceneStore()
/** useTransitionで変化させるY座標 */
const y = computed(() => state.status.isCrossed ? -1 : 0)
/** 垂直方向の位置を変化させる */
const amount = useTransition(y, {
  duration: 1000,
  transition: TransitionPresets.easeInOutCubic,
  onStarted() {
  },
  onFinished() {
    scene.arrive(state)
  },
})
/** 乗り物の外観 */
const appearance = computed(() => {
  // 幅（登場人物の幅 * （登場人物の人数 + 1））
  const width = scene.castWidth * (state.capacity + 1)
  // 高さ（登場人物の高さ * 2.5）
  const height = scene.castWidth * 2.5
  // アスペクト比
  const aspectRatio = width / height
  return {
    width: width,
    height: height,
    aspectRatio: aspectRatio,
  }
})
/** v-cardに適用するCSS transformプロパティ */
const transform = computed(() => `translate(0, ${amount.value * scene.stageSize * 0.3}px)`)
/** 行動に関するプロパティ */
const action = computed(() => {
  /** 進行可能 */
  const { upbound, downbound } = scene.getCarrierStatus(state)
  return {
    upbound: upbound,
    downbound: downbound,
  }
})
/** 乗り物のツールチップ */
const tooltip = computed(() => {
  const { duration, load } = scene.getCarrierStatus(state)
  // テキスト
  const text = scene.passengers[state.id].length > 0 && !state.status.isSailing
    ? scene.state.category === 'time-limited'
      ? `所要時間: ${duration}分`
      : scene.state.category === 'weight-limited'
        ? `積載量: ${load} / ${state.weightLimit}`
        : ''
    : ''
  // 表示
  const model = text !== ''
  return {
    text: text,
    model: model,
  }
})
</script>

<template>
  <v-card
    flat
    :width="appearance.width"
    :style="{ transform: transform }"
    class="d-flex justify-center align-start bg-transparent"
  >
    <v-img
      :aspect-ratio="appearance.aspectRatio"
      :src="state.appearance.sprite"
      :height="appearance.height"
      >
      <v-sheet
        class="d-flex justify-center align-center bg-transparent"
        :height="appearance.height"
      >
        <PuzzleCast
          v-for="cast in scene.passengers[state.id]"
          :key="cast.id"
          :state="cast"
        ></PuzzleCast>
      </v-sheet>
    </v-img>
    <v-menu
      activator="parent"
      :close-on-content-click="false"
      disabled
      location="top"
      v-model="action.upbound"
      persistent
      transition="scroll-y-reverse-transition"
    >
      <div class="d-flex justify-center">
        <v-expand-transition mode="out-in">
          <v-btn
            size="default"
            icon="mdi-arrow-up"
            color="orange"
            class="ma-1"
            @click="scene.leave(state)"
          ></v-btn>
        </v-expand-transition>
      </div>
    </v-menu>
    <v-menu
      activator="parent"
      :close-on-content-click="false"
      disabled
      location="bottom"
      v-model="action.downbound"
      persistent
      transition="scroll-y-transition"
    >
      <div class="d-flex justify-center">
        <v-expand-transition mode="in-out">
          <v-btn
            size="default"
            icon="mdi-arrow-down"
            color="orange"
            class="ma-1"
            @click="scene.leave(state)"
          ></v-btn>
        </v-expand-transition>
      </div>
    </v-menu>
    <v-tooltip
      activator="parent"
      v-model="tooltip.model"
      location="end bottom"
      content-class="pa-1"
    >
      {{ tooltip.text }}
    </v-tooltip>
  </v-card>
</template>


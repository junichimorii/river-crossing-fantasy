<script lang="ts" setup>
import { computed } from 'vue'
import { TransitionPresets, useTransition } from '@vueuse/core'
import { PuzzleCast } from '@/components'
import useCarrier from '@/composables/use-carrier'
import { useSceneStore } from '@/store/scene'
import type { Carrier } from '@/types/carrier'
const { state } = defineProps<{
  state: Carrier
}>()
const scene = useSceneStore()
const { y, duration, load, bound, leave } = useCarrier(state)
/** 垂直方向の位置を変化させる */
const amount = useTransition(y, {
  duration: 1000,
  transition: TransitionPresets.easeInOutCubic,
  onStarted() {
    scene.leave()
  },
  onFinished() {
    scene.arrive(state)
  },
})
/** 上方向に進行可能 */
const upbound = computed(() => !scene.isEmergency && bound.value === 'up')
/** 下方向に進行可能 */
const downbound = computed(() => !scene.isEmergency && bound.value === 'down')
/** 川幅（乗り物が往復する距離） */
const riverWidth = computed(() => scene.stageSize * 0.3)
/** v-cardに適用するCSS transformプロパティ */
const transformCard = computed(() => `translate(0, ${amount.value * riverWidth.value}px)`)
/** 幅（登場人物の幅 * 登場人物の人数 + 登場人物の幅 / 2） */
const width = computed(() => scene.castWidth * state.capacity + scene.castWidth * 0.5)
/** 高さ（登場人物の高さ） */
const height = computed(() => scene.castWidth * 2.5)
/** アスペクト比 */
const aspectRatio = computed(() => width.value / height.value)
/** ツールチップ */
const tooltip = computed(() => tooltipText.value !== '')
/** ツールチップのテキスト */
const tooltipText = computed(() => state.status.passengers.length > 0 && !state.status.isSailing
  ? scene.state.category === 'time-limited'
    ? `所要時間: ${duration.value}分`
    : scene.state.category === 'weight-limited'
      ? `積載量: ${load.value} / ${state.weightLimit}`
      : ''
  : ''
)
</script>

<template>
  <v-card
    flat
    :width="width"
    :style="{ transform: transformCard }"
    class="d-flex justify-center align-start bg-transparent"
  >
    <v-img
      :aspect-ratio="aspectRatio"
      :src="state.appearance"
      :height="height"
      >
      <v-sheet
        class="d-flex justify-center align-center bg-transparent"
        :height="height"
      >
        <PuzzleCast
          v-for="cast in state.status.passengers"
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
      v-model="upbound"
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
            @click="leave"
          ></v-btn>
        </v-expand-transition>
      </div>
    </v-menu>
    <v-menu
      activator="parent"
      :close-on-content-click="false"
      disabled
      location="bottom"
      v-model="downbound"
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
            @click="leave"
          ></v-btn>
        </v-expand-transition>
      </div>
    </v-menu>
    <v-tooltip
      activator="parent"
      v-model="tooltip"
      location="end bottom"
      content-class="pa-1"
    >
      {{ tooltipText }}
    </v-tooltip>
  </v-card>
</template>


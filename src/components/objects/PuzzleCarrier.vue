<script lang="ts" setup>
import { computed } from 'vue'
import { TransitionPresets, useTransition } from '@vueuse/core'
import { PuzzleCast } from '@/components'
import { useAppearance } from '@/composables'
import { useSceneStore } from '@/store/scene'
import type { Carrier } from '@/types/carrier'
const props = defineProps<{
  state: Carrier
}>()
const scene = useSceneStore()
const { stageSize, gridSize } = useAppearance(scene.state)

/** useTransitionで変化させるY座標 */
const y = computed(() => props.state.status.isCrossed ? 1 : 0)

/** 垂直方向の位置を変化させる */
const amount = useTransition(y, {
  duration: 1000,
  transition: TransitionPresets.easeInOutCubic,
  onStarted() {
    scene.disabled = true
  },
  onFinished() {
    scene.disabled = false
    finished()
  },
})

/** v-cardに適用するCSS transformプロパティ */
const transform = computed(() => `translate(0, ${-amount.value * stageSize.value * 0.3}px)`)

/**
 * 乗り物の動作が停止した時
 */
const finished = async () => {
  const result = await scene.arrive(props.state)
  if(result !== undefined) {
    scene.moves.add(result)
  }
}

/** 乗り物の外観 */
const appearance = computed(() => {
  // 幅（登場人物の幅 * （登場人物の人数 + 1））
  const width = gridSize.value * (props.state.capacity + 1)
  // 高さ（登場人物の高さ * 2.5）
  const height = gridSize.value * 2.5
  // アスペクト比
  const aspectRatio = width / height
  return {
    width: width,
    height: height,
    aspectRatio: aspectRatio,
  }
})

/** 行動範囲に関するプロパティ */
const navigation = computed(() => {
  return {
    upbound: scene.isReady(props.state) && !props.state.status.isCrossed,
    downbound: scene.isReady(props.state) && props.state.status.isCrossed,
  }
})

/** 乗り物のツールチップ */
const tooltip = computed(() => {
  // テキスト
  const text = scene.hasPassengers(props.state)
    ? scene.state.category === 'time-limited'
      ? `所要時間: ${scene.getDuration(props.state)}分`
      : scene.state.category === 'weight-limited'
        ? `積載量: ${scene.getLoad(props.state)} / ${props.state.weightLimit}`
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
          v-for="cast in scene.getPassengers(state)"
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
      v-model="navigation.upbound"
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
      v-model="navigation.downbound"
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


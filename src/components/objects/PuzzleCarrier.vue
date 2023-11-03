<script lang="ts" setup>
import { computed } from 'vue'
import { TransitionPresets, useTransition } from '@vueuse/core'
import { PuzzleCast } from '@/components'
import { usePuzzle, useStage } from '@/composables'
import { usePuzzleStore } from '@/store/puzzle'
import type { Carrier } from '@/types/carrier'
const props = defineProps<{
  state: Carrier
}>()
const puzzle = usePuzzleStore()
const { carriers, leave, arrive } = usePuzzle(puzzle.scene)
const { stageSize, gridSize } = useStage(puzzle.scene)
const carrier = carriers.value[props.state.id]

/** useTransitionで変化させるY座標 */
const y = computed(() => props.state.status.isCrossed ? -1 : 0)
/** 垂直方向の位置を変化させる */
const amount = useTransition(y, {
  duration: 1000,
  transition: TransitionPresets.easeInOutCubic,
  onStarted() {
    puzzle.pause()
  },
  onFinished() {
    puzzle.resume()
    finished()
  },
})

/**
 * 乗り物の動作が停止した時
 */
const finished = async () => {
  const result = await arrive(props.state)
  if(result !== undefined) {
    puzzle.queue.add(result)
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
/** v-cardに適用するCSS transformプロパティ */
const transform = computed(() => `translate(0, ${amount.value * stageSize.value * 0.3}px)`)
/** 行動範囲に関するプロパティ */
const navigation = computed(() => {
  /** 進行可能 */
  const { upbound, downbound } = carrier
  return {
    upbound: upbound,
    downbound: downbound,
  }
})
/** 乗り物のツールチップ */
const tooltip = computed(() => {
  const { duration, load } = carrier
  // テキスト
  const text = carrier.passengers.length > 0 && !props.state.status.isSailing
    ? puzzle.scene.category === 'time-limited'
      ? `所要時間: ${duration}分`
      : puzzle.scene.category === 'weight-limited'
        ? `積載量: ${load} / ${props.state.weightLimit}`
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
          v-for="cast in carrier.passengers"
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
            @click="leave(state)"
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
            @click="leave(state)"
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


<script lang="ts" setup>
import { TransitionPresets, useTransition } from '@vueuse/core'
import { computed, toRef } from 'vue'
import type { Carrier } from '@/types'
import { PuzzleCast, PuzzleCarrierMenu, PuzzleCarrierTooltip } from '@/components'
import { useAppearance, useCarrierState, useCasts, useScene } from '@/composables'
import { useSceneStore } from '@/store/scene'
const props = defineProps<{
  state: Carrier
}>()
const store = useSceneStore()
const { stageSize, gridSize } = useAppearance(store.scene)
const { coord } = useCarrierState(toRef(store.state))
const { passengers } = useCasts(toRef(store.state), toRef(store.scene))
const { arrive } = useScene(toRef(store.state), toRef(store.scene))

/**
 * useTransitionで変化させるY座標
 */
 const source = computed(() => coord(props.state))

/**
 * 垂直方向の位置を変化させる
 */
const amount = useTransition(source, {
  duration: 1000,
  transition: TransitionPresets.easeInOutCubic,
  onStarted() {
    store.disabled = true
  },
  onFinished() {
    store.disabled = false
    finished()
  },
})

/**
 * v-cardに適用するCSS transformプロパティ
 */
const transform = computed(() => `translate(0, ${-amount.value * stageSize.value * 0.1 + stageSize.value * 0.1}px)`)

/**
 * 乗り物の動作が停止した時
 */
const finished = async () => {
  const result = await arrive(props.state)
  if(result !== undefined) {
    store.moves.add(result)
  }
}

/**
 * 乗り物の外観
 */
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
          v-for="cast in passengers[state.id]"
          :key="cast.id"
          :state="cast"
        ></PuzzleCast>
      </v-sheet>
    </v-img>
    <PuzzleCarrierMenu :state="state"></PuzzleCarrierMenu>
    <PuzzleCarrierTooltip :state="state"></PuzzleCarrierTooltip>
  </v-card>
</template>


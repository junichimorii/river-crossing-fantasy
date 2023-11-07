<script lang="ts" setup>
import { computed, toRef } from 'vue'
import { TransitionPresets, useTransition } from '@vueuse/core'
import { PuzzleCast } from '@/components'
import { useAppearance, useCarrierState, useCarrier, useCasts, useScene } from '@/composables'
import { useSceneStore } from '@/store/scene'
import type { Carrier } from '@/types/carrier'
const props = defineProps<{
  state: Carrier
}>()
const store = useSceneStore()
const { stageSize, gridSize } = useAppearance(store.scene)
const { isCrossed } = useCarrierState(toRef(store.state))
const { getDuration, getLoad, hasPassengers, isReady } = useCarrier(toRef(store.state), toRef(store.scene))
const { passengers, isPeaceable } = useCasts(toRef(store.state), toRef(store.scene))
const { leave, arrive } = useScene(toRef(store.state), toRef(store.scene))

/**
 * useTransitionで変化させるY座標
 */
const y = computed(() => isCrossed(props.state) ? 1 : 0)

/**
 * 垂直方向の位置を変化させる
 */
const amount = useTransition(y, {
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
const transform = computed(() => `translate(0, ${-amount.value * stageSize.value * 0.3}px)`)

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

/** 行動範囲に関するプロパティ */
const navigation = computed(() => {
  return {
    upbound: isReady(props.state) && isPeaceable.value && !store.disabled && !isCrossed(props.state),
    downbound: isReady(props.state) && isPeaceable.value && !store.disabled && isCrossed(props.state),
  }
})

/** 乗り物のツールチップ */
const tooltip = computed(() => {
  // テキスト
  const text = hasPassengers(props.state)
    ? store.scene.category === 'time-limited'
      ? `所要時間: ${getDuration(props.state)}分`
      : store.scene.category === 'weight-limited'
        ? `積載量: ${getLoad(props.state)} / ${props.state.weightLimit}`
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
          v-for="cast in passengers[state.id]"
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


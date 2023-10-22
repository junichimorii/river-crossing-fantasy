<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { UseSwipeDirection } from '@vueuse/core'
import { usePointerSwipe, useSwipe } from '@vueuse/core'
import useCast from '@/composables/use-cast'
import { useSceneStore } from '@/store/scene'
import type { Cast } from '@/types/cast'
const { state } = defineProps<{
  state: Cast
}>()
const scene = useSceneStore()
const target = ref<HTMLElement | null>(null)
const { bound } = useCast(state)
/** タッチイベントの検知 */
const { direction: directionSwipe, isSwiping: isTouchSwiping } = useSwipe(
  target, {
    onSwipe(event: TouchEvent) {
    },
    onSwipeEnd(event: TouchEvent, direction: UseSwipeDirection) {
      scene.action(state, direction)
    },
  }
)
/** ポインターイベントの検知 */
const { isSwiping: isPointerSwiping, direction: directionPointer } = usePointerSwipe(
  target, {
    onSwipe(event: PointerEvent) {
    },
    onSwipeEnd(event: PointerEvent, direction: UseSwipeDirection) {
      scene.action(state, direction)
    },
  }
)
/** スワイプ中かどうか */
const isSwiping = computed(() => isTouchSwiping.value || isPointerSwiping.value)
/** スワイプ方向 */
const direction = computed(() => directionSwipe.value || directionPointer.value)
/** 矢印の色 */
const signal = computed(() => bound.value === direction.value
  ? 'orange'
  : 'grey'
)
/** v-imgに適用するCSS transformプロパティ */
const transformImage = computed(() => {
  const ratio = state.ratio || 1
  return `scale(${state.status.isCrossed ? -ratio : ratio}, ${ratio})`
})
/** 上方向に進行可能 */
const upbound = computed(() =>  isSwiping.value && bound.value === 'up')
/** 下方向に進行可能 */
const downbound = computed(() =>  isSwiping.value && bound.value === 'down')
/** 幅（登場人物の幅 * 登場人物の人数 + 登場人物の幅 / 2） */
const width = computed(() => scene.castWidth)
/** 高さ（登場人物の高さ） */
const height = computed(() => scene.castWidth * 2)
/** アスペクト比 */
const aspectRatio = computed(() => width.value / height.value)
</script>

<template>
  <v-badge
    :model-value="state.status.emotions.length !== 0"
    :content="state.status.emotions.join('')"
    :offset-x="scene.castWidth * 0.15"
    :offset-y="scene.castWidth * 0.15"
    :color="state.status.emotions.includes('😈')
      ? 'red-lighten-4'
      : state.status.emotions.includes('😰')
        ? 'blue-lighten-4'
        : state.status.emotions.includes('😖')
          ? 'amber-lighten-4'
          : 'white'"
  >
    <v-card
      flat
      ref="target"
      :width="width"
      class="d-flex justify-center align-end bg-transparent"
    >
      <v-img
        :aspect-ratio="aspectRatio"
        :src="state.avatar"
        :height="height"
        :style="{ transform: transformImage }"
        style="transform-origin: bottom center;"
      >
        <div class="d-flex align-center justify-center fill-height"></div>
      </v-img>
      <v-menu
        activator="parent"
        v-model="upbound"
        disabled
        location="top"
        transition="scroll-y-reverse-transition"
      >
        <v-expand-transition mode="out-in">
          <div class="d-flex justify-center">
            <v-icon
              size="x-large"
              icon="mdi-arrow-up"
              :color="signal"
            ></v-icon>
          </div>
        </v-expand-transition>
      </v-menu>
      <v-menu
        activator="parent"
        v-model="downbound"
        disabled
        location="bottom"
        transition="scroll-y-transition"
      >
        <v-expand-transition mode="in-out">
          <div class="d-flex justify-center">
            <v-icon
              size="x-large"
              icon="mdi-arrow-down"
              :color="signal"
            ></v-icon>
          </div>
        </v-expand-transition>
      </v-menu>
    </v-card>
  </v-badge>
</template>


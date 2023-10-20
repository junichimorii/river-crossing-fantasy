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
const { upbound, downbound } = useCast(state)
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
/** 矢印の色 */
const signal = computed(() => 
  (upbound.value && (directionSwipe.value === 'up' ||  directionPointer.value === 'up'))
    || (downbound.value && (directionSwipe.value === 'down' || directionPointer.value === 'down'))
      ? 'green' : 'grey'
)
/** v-imgに適用するCSS transformプロパティ */
const transformImage = computed(() => {
  const ratio = state.ratio || 1
  return `scale(${state.status.isCrossed ? -ratio : ratio}, ${ratio})`
})
/** 進行可能な方向 */
const direction = computed(() => {
  return {
    upbound: isSwiping.value && upbound.value,
    downbound: isSwiping.value && downbound.value,
  }
})
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
    :offset-x="scene.castWidth * 0.1"
    :offset-y="scene.castWidth * 0.1"
    color="white"
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
        v-model="direction.upbound"
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
        v-model="direction.downbound"
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


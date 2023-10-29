<script lang="ts" setup>
import { computed, ref } from 'vue'
import { usePointerSwipe, useSwipe } from '@vueuse/core'
import { useSceneStore } from '@/store/scene'
import type { UseSwipeDirection } from '@vueuse/core'
import type { Cast } from '@/types/cast'
const { state } = defineProps<{
  state: Cast
}>()
const scene = useSceneStore()
const target = ref<HTMLElement | null>(null)
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
/** 登場人物の外観 */
const appearance = computed(() => {
  // 幅（登場人物の幅 * 登場人物の人数 + 登場人物の幅 / 2）
  const width = scene.castWidth
  // 高さ（登場人物の高さ）
  const height = scene.castWidth * 2
  // アスペクト比
  const aspectRatio = width / height
  return {
    width: width,
    height: height,
    aspectRatio: aspectRatio,
  }
})
/** v-imgに適用するCSS transformプロパティ */
const transform = computed(() => {
  const ratio = state.appearance.ratio || 1
  return `scale(${state.status.isCrossed ? -ratio : ratio}, ${ratio})`
})
/** 行動に関するプロパティ */
const action = computed(() => {
  const bound = !state.status.disabled 
    // 乗り物の上から向こう岸に降りる or 手前の岸から乗り物に乗る時、上方向に移動できる
    ? (state.status.boarding !== undefined && state.status.isCrossed) || (state.status.boarding === undefined && !state.status.isCrossed)
      ? 'up'
      // 乗り物の上から手前の岸に降りる or 向こう岸から乗り物に乗る時、下方向に移動できる
      : (state.status.boarding !== undefined && !state.status.isCrossed) || (state.status.boarding === undefined && state.status.isCrossed)
        ? 'down'
        : 'none'
    : 'none'
  /** 上方向に進行可能 */
  const upbound = isSwiping.value && bound === 'up'
  /** 下方向に進行可能 */
  const downbound = isSwiping.value && bound === 'down'
  /** 矢印の色 */
  const color = bound === direction.value ? 'orange' : 'grey'
  return {
    upbound: upbound,
    downbound: downbound,
    color: color
  }
})
/** 感情（バッジ）に関するプロパティ */
const emotion = computed(() => {
  const emotions = Array.from(new Set(state.status.emotions))
  const isScared = emotions.includes('scared')  // 怖い、危機に瀕している
  const isExcited = emotions.includes('excited') // 興奮している、喜んでいる
  const isSurprised = emotions.includes('surprised')  // 驚いている、困っている
  const content = `${isScared?'😰':''}${isExcited?'😈':''}${isSurprised?'😖':''}`
  const color = isExcited
    ? 'red-lighten-4'
    : isScared
      ? 'blue-lighten-4'
      : isSurprised
        ? 'amber-lighten-4'
        : 'white'
  const offset = scene.castWidth * 0.1 * (3 - (state.appearance.ratio || 2))
  return {
    model: emotions.length > 0,
    content: content,
    color: color,
    offset: offset
  }
})
</script>

<template>
  <v-badge
    :model-value="emotion.model"
    :content="emotion.content"
    :color="emotion.color"
    :offset-x="emotion.offset"
    :offset-y="emotion.offset"
  >
    <v-card
      flat
      ref="target"
      :width="appearance.width"
      class="d-flex justify-center align-end bg-transparent"
    >
      <v-img
        :aspect-ratio="appearance.aspectRatio"
        :src="state.appearance.sprite"
        :height="appearance.height"
        :style="{ transform: transform }"
        style="transform-origin: bottom center;"
      >
        <div class="d-flex justify-center align-end fill-height"></div>
      </v-img>
      <v-menu
        activator="parent"
        v-model="action.upbound"
        disabled
        location="top"
        transition="scroll-y-reverse-transition"
      >
        <v-expand-transition mode="out-in">
          <div class="d-flex justify-center">
            <v-icon
              size="x-large"
              icon="mdi-arrow-up"
              :color="action.color"
            ></v-icon>
          </div>
        </v-expand-transition>
      </v-menu>
      <v-menu
        activator="parent"
        v-model="action.downbound"
        disabled
        location="bottom"
        transition="scroll-y-transition"
      >
        <v-expand-transition mode="in-out">
          <div class="d-flex justify-center">
            <v-icon
              size="x-large"
              icon="mdi-arrow-down"
              :color="action.color"
            ></v-icon>
          </div>
        </v-expand-transition>
      </v-menu>
    </v-card>
  </v-badge>
</template>

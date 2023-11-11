<script lang="ts" setup>
import { computed, ref, toRef } from 'vue'
import { usePointerSwipe, useSwipe } from '@vueuse/core'
import { PuzzleCastEmotion, PuzzleCastMenu } from '@/components'
import { useAppearance, useCastState, useScene } from '@/composables'
import { useSceneStore } from '@/store/scene'
import type { UseSwipeDirection } from '@vueuse/core'
import type { Cast } from '@/types'
const props = defineProps<{
  state: Cast
}>()
const store = useSceneStore()
const { gridSize } = useAppearance(store.scene)
const { coord, boarding } = useCastState(toRef(store.state))
const { pickUp, dropOff, safetyConfirmation } = useScene(toRef(store.state), toRef(store.scene))
const target = ref<HTMLElement | null>(null)

/**
 * タッチイベントの検知
 */
const { direction: directionSwipe, isSwiping: isTouchSwiping } = useSwipe(
  target, {
    onSwipe(event: TouchEvent) {
    },
    onSwipeEnd(event: TouchEvent, direction: UseSwipeDirection) {
      action(direction)
    },
  }
)

/**
 * ポインターイベントの検知
 */
const { isSwiping: isPointerSwiping, direction: directionPointer } = usePointerSwipe(
  target, {
    onSwipe(event: PointerEvent) {
    },
    onSwipeEnd(event: PointerEvent, direction: UseSwipeDirection) {
      action(direction)
    },
  }
)

/**
 * スワイプ中かどうか
 */
const isSwiping = computed(() => isTouchSwiping.value || isPointerSwiping.value)

/**
 * スワイプ方向
 */
const swipeDirection = computed(() => directionSwipe.value || directionPointer.value)

/**
 * 登場人物のスワイプが終了した時
 */
const action = async (
  direction: UseSwipeDirection
) => {
  if (store.disabled) return
  // 登場人物を乗り物から降ろす
  const canDropOff = (boarding(props.state) !== null && direction === (coord(props.state) > 0 ? 'up' : 'down'))
  if (canDropOff) await dropOff(props.state)
  // 搭乗可能な乗り物があれば乗せる
  const canPickUp = (boarding(props.state) === null && direction === (coord(props.state) < 0 ? 'up' : 'down'))
  if (canPickUp) await pickUp(props.state)
  await safetyConfirmation()
}

/**
 * 登場人物の外観
 */
const appearance = computed(() => {
  // 幅（登場人物の幅 * 登場人物の人数 + 登場人物の幅 / 2）
  const width = gridSize.value
  // 高さ（登場人物の高さ）
  const height = width * 2
  // アスペクト比
  const aspectRatio = width / height
  return {
    width: width,
    height: height,
    aspectRatio: aspectRatio,
  }
})

/**
 * v-imgに適用するCSS transformプロパティ
 */
const transform = computed(() => {
  const ratio = props.state.appearance.ratio || 1
  return `scale(${coord(props.state) > 0 ? -ratio : ratio}, ${ratio})`
})
</script>

<template>
  <PuzzleCastEmotion
    :state="state"
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
      <PuzzleCastMenu
        :state="state"
        :isSwiping="isSwiping"
        :swipeDirection="swipeDirection"
      ></PuzzleCastMenu>
    </v-card>
  </PuzzleCastEmotion>
</template>

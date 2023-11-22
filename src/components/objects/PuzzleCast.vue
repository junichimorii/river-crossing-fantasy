<script lang="ts" setup>
import { usePointerSwipe, useSwipe } from '@vueuse/core'
import { computed, ref, toRef } from 'vue'
import type { Cast } from '@/types'
import type { UseSwipeDirection } from '@vueuse/core'
import sprites from '@/assets/images/casts'
import { PuzzleCastEmotion, PuzzleCastMenu } from '@/components'
import { useCastAppearance, useCastState, useScene } from '@/composables'
import { useSceneStore } from '@/store/scene'
const props = defineProps<{
  state: Cast
}>()
const target = ref<HTMLElement | null>(null)
const store = useSceneStore()
const { width, height, aspectRatio } = useCastAppearance()
const { coord, boarding } = useCastState(toRef(store.state))
const { pickUp, dropOff, safetyConfirmation } = useScene(toRef(store.state), toRef(store.scene))

/**
 * v-imgに適用するCSS transformプロパティ
 */
 const transform = computed(() => {
  const ratio = props.state.appearance.ratio || 1
  return `scale(${coord(props.state) > 0 ? -ratio : ratio}, ${ratio})`
})

/**
 * タッチイベントの検知
 */
const { direction: directionSwipe, isSwiping: isTouchSwiping } = useSwipe(
  target, {
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
  const canDropOff = (boarding(props.state) !== null && direction === (coord(props.state) === 0 ? 'left' : coord(props.state) > 0 ? 'up' : 'down'))
  if (canDropOff) await dropOff(props.state)
  // 搭乗可能な乗り物があれば乗せる
  const canPickUp = (boarding(props.state) === null && direction === (coord(props.state) === 0 ? 'right' : coord(props.state) < 0 ? 'up' : 'down'))
  if (canPickUp) await pickUp(props.state)
  await safetyConfirmation()
}
</script>

<template>
  <PuzzleCastEmotion
    :state="state"
  >
    <v-card
      flat
      ref="target"
      :width="width"
      :height="height"
      :aspect-ratio="aspectRatio"
      class="d-flex justify-center align-end bg-transparent"
    >
      <v-img
        :src="sprites[state.appearance.sprite]"
        :width="width"
        :height="height"
        :aspect-ratio="aspectRatio"
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

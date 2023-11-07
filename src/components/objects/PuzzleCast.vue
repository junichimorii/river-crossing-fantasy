<script lang="ts" setup>
import { computed, ref, toRef } from 'vue'
import { usePointerSwipe, useSwipe } from '@vueuse/core'
import { PuzzleCastEmotion } from '@/components'
import { useAppearance, useCastState, useScene } from '@/composables'
import { useSceneStore } from '@/store/scene'
import type { UseSwipeDirection } from '@vueuse/core'
import type { Cast } from '@/types/cast'
const props = defineProps<{
  state: Cast
}>()
const store = useSceneStore()
const { gridSize } = useAppearance(store.scene)
const { isCrossed, boarding } = useCastState(toRef(store.state))
const { pickUp, dropOff } = useScene(toRef(store.state), toRef(store.scene))
const target = ref<HTMLElement | null>(null)

/** タッチイベントの検知 */
const { direction: directionSwipe, isSwiping: isTouchSwiping } = useSwipe(
  target, {
    onSwipe(event: TouchEvent) {
    },
    onSwipeEnd(event: TouchEvent, direction: UseSwipeDirection) {
      action(direction)
    },
  }
)

/** ポインターイベントの検知 */
const { isSwiping: isPointerSwiping, direction: directionPointer } = usePointerSwipe(
  target, {
    onSwipe(event: PointerEvent) {
    },
    onSwipeEnd(event: PointerEvent, direction: UseSwipeDirection) {
      action(direction)
    },
  }
)

/** スワイプ中かどうか */
const isSwiping = computed(() => isTouchSwiping.value || isPointerSwiping.value)

/** スワイプ方向 */
const direction = computed(() => directionSwipe.value || directionPointer.value)

/** 登場人物をスワイプした時 */
const action = async (
  direction: UseSwipeDirection
) => {
  if (store.disabled) return
  // 登場人物を乗り物から降ろす
  const canGetOff = boarding(props.state) !== null
    && direction === (isCrossed(props.state) ? 'up' : 'down')
  if (canGetOff) await dropOff(props.state)
  // 搭乗可能な乗り物があれば乗る
  const canGetOn = (boarding(props.state) === null
    && direction === (isCrossed(props.state) ? 'down' : 'up'))
  if (canGetOn) await pickUp(props.state)
}

/** 登場人物の外観 */
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
/** v-imgに適用するCSS transformプロパティ */
const transform = computed(() => {
  const ratio = props.state.appearance.ratio || 1
  return `scale(${isCrossed(props.state) ? -ratio : ratio}, ${ratio})`
})

/** 行動範囲に関するプロパティ */
const navigation = computed(() => {
  // 乗り物の上から向こう岸に降りる or 手前の岸から乗り物に乗る時、上方向に移動できる
  const bound = (boarding(props.state) !== null && isCrossed(props.state))
    || (boarding(props.state) === null && !isCrossed(props.state))
    ? 'up'
    // 乗り物の上から手前の岸に降りる or 向こう岸から乗り物に乗る時、下方向に移動できる
    : (boarding(props.state) !== null && !isCrossed(props.state))
    || (boarding(props.state) === null && isCrossed(props.state))
      ? 'down'
      : 'none'
  /** 上方向に進行可能 */
  const upbound = isSwiping.value && !store.disabled && bound === 'up'
  /** 下方向に進行可能 */
  const downbound = isSwiping.value && !store.disabled && bound === 'down'
  /** 矢印の色 */
  const color = bound === direction.value ? 'orange' : 'grey'
  return {
    upbound: upbound,
    downbound: downbound,
    color: color
  }
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
      <v-menu
        activator="parent"
        v-model="navigation.upbound"
        disabled
        location="top"
        transition="scroll-y-reverse-transition"
      >
        <v-expand-transition mode="out-in">
          <div class="d-flex justify-center">
            <v-icon
              size="x-large"
              icon="mdi-arrow-up"
              :color="navigation.color"
            ></v-icon>
          </div>
        </v-expand-transition>
      </v-menu>
      <v-menu
        activator="parent"
        v-model="navigation.downbound"
        disabled
        location="bottom"
        transition="scroll-y-transition"
      >
        <v-expand-transition mode="in-out">
          <div class="d-flex justify-center">
            <v-icon
              size="x-large"
              icon="mdi-arrow-down"
              :color="navigation.color"
            ></v-icon>
          </div>
        </v-expand-transition>
      </v-menu>
    </v-card>
  </PuzzleCastEmotion>
</template>

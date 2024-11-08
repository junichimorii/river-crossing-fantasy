<script lang="ts" setup>
import sprites from '@/assets/images/casts'
import { useCast, useCastAppearance, useCastState, useScene } from '@/composables'
import { useSceneStore } from '@/stores/scene'
import type { Cast } from '@/types'
import type { UseSwipeDirection } from '@vueuse/core'
const props = defineProps<{
  state: Cast
}>()
const { state: cast } = toRefs(props)
const target = ref<HTMLElement | null>(null)
const { state, scene, disabled } = storeToRefs(useSceneStore())
const { width, height, aspectRatio } = useCastAppearance()
const { getTransform } = useCast()
const { coord, boarding } = useCastState(state)
const { pickUp, dropOff, safetyConfirmation } = useScene(state, scene)

/** v-imgに適用するCSS transformプロパティ */
const transform = computed(() => getTransform(cast.value, coord(cast.value)))

/** タッチイベントの検知 */
const { isSwiping: isTouchSwiping } = useSwipe(
  target, {
    onSwipeEnd(event: TouchEvent, direction: UseSwipeDirection) {
      action(direction)
    },
  }
)

/** ポインターイベントの検知 */
const { isSwiping: isPointerSwiping } = usePointerSwipe(
  target, {
    onSwipeEnd(event: PointerEvent, direction: UseSwipeDirection) {
      action(direction)
    },
  }
)

/** スワイプ中かどうか */
const isSwiping = computed(() => isTouchSwiping.value || isPointerSwiping.value)

/** 登場人物のスワイプが終了した時 */
const action = async (
  direction: UseSwipeDirection
) => {
  if (disabled.value) return
  // 登場人物を乗り物から降ろす
  const canDropOff = (boarding(cast.value) !== null && direction === (coord(cast.value) === 0 ? 'left' : coord(cast.value) > 0 ? 'up' : 'down'))
  if (canDropOff) await dropOff(cast.value)
  // 搭乗可能な乗り物があれば乗せる
  const canPickUp = (boarding(cast.value) === null && direction === (coord(cast.value) === 0 ? 'right' : coord(cast.value) < 0 ? 'up' : 'down'))
  if (canPickUp) await pickUp(cast.value)
  await safetyConfirmation()
}
</script>

<template>
  <PuzzleCastEmotion :state="cast">
    <v-card
      ref="target"
      flat
      :width="width"
      :height="height"
      :aspect-ratio="aspectRatio"
      class="d-flex justify-center align-end bg-transparent"
    >
      <v-img
        src="@/assets/images/shadow.png"
        cover
        :width="width"
        :height="height"
        :aspect-ratio="aspectRatio"
      >
        <v-img
          :src="sprites[cast.appearance]"
          cover
          :width="width"
          :height="height"
          :aspect-ratio="aspectRatio"
          :style="{ transform }"
          style="transform-origin: bottom center;"
        >
          <div class="d-flex justify-center align-end fill-height">
            <PuzzleCastNameplate :state="cast" />
          </div>
        </v-img>
      </v-img>
      <PuzzleCastMenu
        :state="cast"
        :is-swiping="isSwiping"
      />
    </v-card>
  </PuzzleCastEmotion>
</template>

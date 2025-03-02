<script lang="ts" setup>
import sprites from '@/assets/images/crews'
import { useCrew, useCrewAppearance, useCrewState, useScene } from '@/composables'
import { useSceneStore } from '@/stores/scene'
import type { Crew } from '@/types'
import type { UseSwipeDirection } from '@vueuse/core'
const props = defineProps<{
  state: Crew
}>()
const { state: crew } = toRefs(props)
const el = useTemplateRef<HTMLElement>('el')
const { state: sceneState, scene, disabled } = storeToRefs(useSceneStore())
const { width, height, aspectRatio } = useCrewAppearance()
const { getScale } = useCrew()
const { coord, boarding } = useCrewState(sceneState)
const { pickUp, dropOff, safetyConfirmation } = useScene(sceneState, scene)

/** v-imgに適用するCSS scaleプロパティ */
const scale = computed(() => getScale(crew.value, coord(crew.value)))

/** タッチイベントの検知 */
const { isSwiping: isTouchSwiping } = useSwipe(
  el,
  {
    onSwipeEnd(event: TouchEvent, direction: UseSwipeDirection) {
      action(direction)
    },
  }
)

/** ポインターイベントの検知 */
const { isSwiping: isPointerSwiping } = usePointerSwipe(
  el,
  {
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
  const canDropOff = (boarding(crew.value) !== null && direction === (coord(crew.value) === 0 ? 'left' : coord(crew.value) > 0 ? 'up' : 'down'))
  if (canDropOff) await dropOff(crew.value)
  // 搭乗可能な乗り物があれば乗せる
  const canPickUp = (boarding(crew.value) === null && direction === (coord(crew.value) === 0 ? 'right' : coord(crew.value) < 0 ? 'up' : 'down'))
  if (canPickUp) await pickUp(crew.value)
  await safetyConfirmation()
}
</script>

<template>
  <PuzzleCrewEmotion :state="crew">
    <v-card
      :ref="'el'"
      flat
      :width="width"
      :height="height"
      :aspect-ratio="aspectRatio"
      class="d-flex justify-center align-end bg-transparent"
    >
      <v-img
        src="@/assets/images/shadow.webp"
        cover
        :width="width"
        :height="height"
        :aspect-ratio="aspectRatio"
      >
        <v-img
          cover
          :src="sprites[crew.appearance]"
          :width="width"
          :height="height"
          :aspect-ratio="aspectRatio"
          :style="{ scale }"
          class="puzzle-crew"
        >
          <div class="d-flex justify-center align-end fill-height">
            <PuzzleCrewNameplate :state="crew" />
          </div>
        </v-img>
      </v-img>
      <PuzzleCrewMenu
        :state="crew"
        :is-swiping="isSwiping"
      />
    </v-card>
  </PuzzleCrewEmotion>
</template>

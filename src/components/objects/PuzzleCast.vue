<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { UseSwipeDirection } from '@vueuse/core'
import { usePointerSwipe, useSwipe } from '@vueuse/core'
import useCast from '@/composables/use-cast'
import { useRecordsStore } from '@/store/records'
import { useSceneStore } from '@/store/scene'
import type { Cast } from '@/types/cast'
const { state } = defineProps<{
  state: Cast
}>()
const records = useRecordsStore()
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
/** シーン開始直後にヒントを表示する */
const showHintSwipe = computed(() => !records.hasActivity('swiped'))
/** 舟に乗った時にヒントを表示する */
const showHintGetOff = computed(() => records.hasActivity('gotOn') && !records.hasActivity('gotOff') && !records.hasActivity('left'))
/** 対岸に移動した直後にヒントを表示する */
const showHintArrived = computed(() =>
  records.hasActivity('arrived') && !records.hasActivity('gotOnFromOpposite') && state.status.isCrossed && !state.status.isSeated && !scene.isCompleted
)
/** 矢印の色 */
const signal = computed(() => 
  (upbound.value && (directionSwipe.value === 'up' ||  directionPointer.value === 'up'))
    || (downbound.value && (directionSwipe.value === 'down' || directionPointer.value === 'down'))
      ? 'green' : 'grey'
)
/** v-imgに適用するCSS transformプロパティ */
const transformImage = computed(() => `scale(${state.status.isCrossed ? -1 : 1}, 1)`)
/** スワイプ中かどうか */
const isSwiping = computed(() => isTouchSwiping.value || isPointerSwiping.value)
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
    <v-tooltip
      activator="parent"
      v-model="showHintSwipe"
      location="end"
    >
      <v-icon
        icon="mdi-arrow-left"
      ></v-icon>
      キャラクターを上方向にスワイプし、舟の上にセットします。
    </v-tooltip>
    <v-tooltip
      activator="parent"
      v-model="showHintGetOff"
      location="start"
    >
      下方向にスワイプすると舟から降ります。
      <v-icon
        icon="mdi-arrow-right"
      ></v-icon>
    </v-tooltip>
    <v-tooltip
      activator="parent"
      v-model="showHintArrived"
      location="start"
    >
      対岸のキャラクターを舟に乗せる時は下方向にスワイプします。
      <v-icon
        icon="mdi-arrow-right"
      ></v-icon>
    </v-tooltip>
  </v-card>
</template>


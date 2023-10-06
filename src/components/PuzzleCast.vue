<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { UseSwipeDirection } from '@vueuse/core'
import { useSwipe, usePointerSwipe } from '@vueuse/core'
import useCast from '@/composable/use-cast'
import { useSceneStore } from '@/store/scene'
import type { Cast } from '@/types/cast'
const { state } = defineProps<{
  state: Cast
}>()
const scene = useSceneStore()
const target = ref<HTMLElement | null>(null)
const { enableArrowUp, enableArrowDown } = useCast(state)
/**
 * タッチイベントの検知
 */
const { direction: directionSwipe, isSwiping } = useSwipe(
  target, {
    passive: false,
    onSwipe(e: TouchEvent) {
    },
    onSwipeEnd(e: TouchEvent, direction: UseSwipeDirection) {
      scene.action(state, direction)
    },
  }
)
/**
 * ポインターイベントの検知
 */
const { isSwiping: isPointerSwiping, direction: directionPointer } = usePointerSwipe(
  target, {
    onSwipe(e: PointerEvent) {
    },
    onSwipeEnd(e: PointerEvent, direction: UseSwipeDirection) {
      scene.action(state, direction)
    },
})
/**
 * 適用するスタイル（transformプロパティ）
 */
const transformProperty = computed(() => `scale(${state.status.isCrossed ? -1 : 1}, 1)`)
const width = computed(() => scene.castSize) 
const height = computed(() => scene.castSize * 2)
const direction = computed(() => {
  return {
    up: {
      enabled: !state.status.disabled && (isSwiping.value || isPointerSwiping.value) && enableArrowUp.value,
      isActive: directionSwipe.value === 'up' ||  directionPointer.value === 'up',
    },
    down: {
      enabled: !state.status.disabled && (isSwiping.value || isPointerSwiping.value) && enableArrowDown.value,
      isActive: directionSwipe.value === 'down' ||  directionPointer.value === 'down',
    }
  }
})
</script>

<template>
  <v-card
    flat
    ref="target"
    :width="width"
    :height="height"
    class="bg-transparent"
  >
    <v-img
      :src="state.avatar"
      :style="{ transform: transformProperty }"
    >
      <div class="d-flex align-center justify-center fill-height"></div>
    </v-img>
    <v-menu
      activator="parent"
      v-model="direction.up.enabled"
      disabled
      location="top"
      transition="scroll-y-reverse-transition"
    >
      <v-expand-transition mode="out-in">
        <div class="d-flex justify-center">
          <v-icon
            size="x-large"
            icon="mdi-arrow-up"
            :color="direction.up.isActive ? 'orange' : 'grey'"
          ></v-icon>
        </div>
      </v-expand-transition>
    </v-menu>
    <v-menu
      activator="parent"
      v-model="direction.down.enabled"
      disabled
      location="bottom"
      transition="scroll-y-transition"
    >
      <v-expand-transition mode="in-out">
        <div class="d-flex justify-center">
          <v-icon
            size="x-large"
            icon="mdi-arrow-down"
            :color="direction.down.isActive ? 'orange' : 'grey'"
          ></v-icon>
        </div>
      </v-expand-transition>
    </v-menu>
  </v-card>
</template>


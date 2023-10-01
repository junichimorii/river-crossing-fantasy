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
const width = computed(() => scene.castSize) 
const height = computed(() => scene.castSize * 2)
const modelUp = computed(() => (isSwiping.value || isPointerSwiping.value) && enableArrowUp.value)
const modelDown = computed(() => (isSwiping.value || isPointerSwiping.value) && enableArrowDown.value)
</script>

<template>
  <v-card
    flat
    ref="target"
    :width="width"
    :height="height"
    class="bg-transparent"
  >
    <v-img :src="state.avatar">
      {{ state.id }}
    </v-img>
    <v-menu
      activator="parent"
      v-model="modelUp"
      disabled
      location="top"
      transition="scroll-y-reverse-transition"
    >
      <v-expand-transition mode="out-in">
        <div class="d-flex justify-center">
          <v-icon
            size="x-large"
            icon="mdi-arrow-up"
          ></v-icon>
        </div>
      </v-expand-transition>
    </v-menu>
    <v-menu
      activator="parent"
      v-model="modelDown"
      disabled
      location="bottom"
      transition="scroll-y-transition"
    >
      <v-expand-transition mode="in-out">
        <div class="d-flex justify-center">
          <v-icon
            size="x-large"
            icon="mdi-arrow-down"
          ></v-icon>
        </div>
      </v-expand-transition>
    </v-menu>
  </v-card>
</template>


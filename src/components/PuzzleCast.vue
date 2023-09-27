<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import type { UseSwipeDirection } from '@vueuse/core'
import { useSwipe } from '@vueuse/core'
import { useSceneStore } from '@/store/scene'
import useCast from '@/composable/use-cast'
import type { Cast } from '@/types/cast'
const props = defineProps<{
  state: Cast
}>()
const target = ref<HTMLElement | null>(null)
const scene = useSceneStore()
const { getRequest, pass } = useCast(props.state)
const { direction, isSwiping /*, lengthX, lengthY */ } = useSwipe(
  target, {
    passive: false,
    onSwipe(e: TouchEvent) {
    },
    onSwipeEnd(e: TouchEvent, direction: UseSwipeDirection) {
      const request = getRequest(direction)
      scene.action(props.state, request)
    },
  }
)
const { width: windowWidth, height: windowHeight } = useWindowSize()
const size = computed(() => windowWidth.value < windowHeight.value ? windowWidth.value : windowHeight.value)
const width = computed(() => size.value / 10)  // 乗り物の幅
const height = computed(() => width.value * 4 / 3)  // 乗り物の高さ
const up = computed(() => isSwiping.value && pass.value.up)
const down = computed(() => isSwiping.value && pass.value.down)
const left = false
const right = false
</script>

<template>
  <div ref="target">
    <v-card
      :width="width"
      :height="height"
      color="red"
    >
      {{ state.id }}
      <v-menu
        activator="parent"
        v-model="up"
        location="top"
        transition="scroll-y-reverse-transition"
        :width="width"
      >
        <v-sheet class="d-flex justify-center bg-transparent">
          <v-icon icon="mdi-arrow-up"></v-icon>
        </v-sheet>
      </v-menu>
      <v-menu
        activator="parent"
        v-model="left"
        location="start"
        :height="height"
      >
        <v-sheet class="d-flex justify-center bg-transparent">
          <v-icon icon="mdi-arrow-left"></v-icon>
        </v-sheet>
      </v-menu>
      <v-menu
        activator="parent"
        v-model="right"
        location="end"
        :height="height"
      >
        <v-sheet class="d-flex justify-center bg-transparent">
          <v-icon icon="mdi-arrow-right"></v-icon>
        </v-sheet>
      </v-menu>
      <v-menu
        activator="parent"
        v-model="down"
        location="bottom"
        transition="scroll-y-transition"
        :width="width"
      >
        <v-sheet class="d-flex justify-center bg-transparent">
          <v-icon icon="mdi-arrow-down"></v-icon>
        </v-sheet>
      </v-menu>
    </v-card>
  </div>
</template>


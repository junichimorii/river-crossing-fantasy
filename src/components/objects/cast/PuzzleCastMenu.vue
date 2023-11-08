<script lang="ts" setup>
import { computed, toRef } from 'vue'
import { useCastState } from '@/composables'
import { useSceneStore } from '@/store/scene'
import type { UseSwipeDirection } from '@vueuse/core'
import type { Cast } from '@/types'
const props = defineProps<{
  state: Cast
  isSwiping: boolean
  swipeDirection: UseSwipeDirection
}>()
const store = useSceneStore()
const { isCrossed, boarding } = useCastState(toRef(store.state))

/** 行動範囲に関するプロパティ */
const bound = computed(() =>
  // 乗り物の上から向こう岸に降りる or 手前の岸から乗り物に乗る時、上方向に移動できる
  (boarding(props.state) !== null && isCrossed(props.state)) || (boarding(props.state) === null && !isCrossed(props.state))
    ? 'up'
    // 乗り物の上から手前の岸に降りる or 向こう岸から乗り物に乗る時、下方向に移動できる
    : (boarding(props.state) !== null && !isCrossed(props.state)) || (boarding(props.state) === null && isCrossed(props.state))
      ? 'down'
      : 'none'
)
/** 上方向に進行可能 */
const upbound = computed(() => props.isSwiping && !store.disabled && bound.value === 'up')
/** 下方向に進行可能 */
const downbound = computed(() => props.isSwiping && !store.disabled && bound.value === 'down')
/** 矢印の色 */
const color = computed(() => bound.value === props.swipeDirection ? 'tertiary' : 'grey')
</script>

<template>
  <v-menu
    activator="parent"
    v-model="upbound"
    disabled
    location="top"
    transition="scroll-y-reverse-transition"
  >
    <v-expand-transition mode="out-in">
      <div class="d-flex justify-center">
        <v-icon
          size="x-large"
          icon="mdi-arrow-up"
          :color="color"
        ></v-icon>
      </div>
    </v-expand-transition>
  </v-menu>
  <v-menu
    activator="parent"
    v-model="downbound"
    disabled
    location="bottom"
    transition="scroll-y-transition"
  >
    <v-expand-transition mode="in-out">
      <div class="d-flex justify-center">
        <v-icon
          size="x-large"
          icon="mdi-arrow-down"
          :color="color"
        ></v-icon>
      </div>
    </v-expand-transition>
  </v-menu>
</template>

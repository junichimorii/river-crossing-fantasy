<script lang="ts" setup>
import { computed, toRef } from 'vue'
import type { Cast } from '@/types'
import type { UseSwipeDirection } from '@vueuse/core'
import { useCastState } from '@/composables'
import { useSceneStore } from '@/store/scene'
const props = defineProps<{
  state: Cast
  isSwiping: boolean
  swipeDirection: UseSwipeDirection
}>()
const store = useSceneStore()
const { coord, boarding } = useCastState(toRef(store.state))

/**
 * 行動範囲に関するプロパティ
 */
const bound = computed(() =>
  // 乗り物の上から向こう岸に降りる or 手前の岸から乗り物に乗る時、上方向に移動できる
  (boarding(props.state) !== null && coord(props.state) > 0)
  || (boarding(props.state) === null && coord(props.state) < 0)
    ? 'inbound'
    // 乗り物の上から手前の岸に降りる or 向こう岸から乗り物に乗る時、下方向に移動できる
    : (boarding(props.state) !== null && coord(props.state) < 0)
    || (boarding(props.state) === null && coord(props.state) > 0)
      ? 'outbound'
      // 乗り物の上から中州に降りる時、左方向に移動できる
      : (boarding(props.state) !== null && coord(props.state) === 0)
        ? 'stopover'
        // 中州から乗り物に乗る時、右方向に移動できる
        : (boarding(props.state) === null && coord(props.state) === 0)
          ? 'resume'
          : 'none'
)
/**
 * 進行可能かどうか
 */
const isEnabled = computed(() => !store.disabled && props.isSwiping)
/**
 * 上り方向に進行可能
 */
const inbound = computed(() => isEnabled.value && bound.value === 'inbound')
/**
 * 下り方向に進行可能
 */
const outbound = computed(() => isEnabled.value && bound.value === 'outbound')
/**
 * 筏（いかだ）から中州方向に進行可能
 */
const stopover = computed(() => isEnabled.value && bound.value === 'stopover')
/**
 * 中州から筏（いかだ）方向に進行可能
 */
const resume = computed(() => isEnabled.value && bound.value === 'resume')
</script>

<template>
  <v-menu
    activator="parent"
    v-model="inbound"
    disabled
    location="top"
    transition="scroll-y-reverse-transition"
  >
    <v-expand-transition mode="out-in">
      <div class="d-flex justify-center">
        <v-icon
          size="x-large"
          icon="mdi-arrow-up"
          color="amber"
        ></v-icon>
      </div>
    </v-expand-transition>
  </v-menu>
  <v-menu
    activator="parent"
    v-model="stopover"
    disabled
    location="start"
    transition="scroll-x-reverse-transition"
  >
    <v-expand-transition mode="out-in">
      <div class="d-flex align-center">
        <v-icon
          size="x-large"
          icon="mdi-arrow-left"
          color="amber"
        ></v-icon>
      </div>
    </v-expand-transition>
  </v-menu>
  <v-menu
    activator="parent"
    v-model="resume"
    disabled
    location="end"
    transition="scroll-x-transition"
  >
    <v-expand-transition mode="in-out">
      <div class="d-flex align-center">
        <v-icon
          size="x-large"
          icon="mdi-arrow-right"
          color="amber"
        ></v-icon>
      </div>
    </v-expand-transition>
  </v-menu>
  <v-menu
    activator="parent"
    v-model="outbound"
    disabled
    location="bottom"
    transition="scroll-y-transition"
  >
    <v-expand-transition mode="in-out">
      <div class="d-flex justify-center">
        <v-icon
          size="x-large"
          icon="mdi-arrow-down"
          color="amber"
        ></v-icon>
      </div>
    </v-expand-transition>
  </v-menu>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { TransitionPresets, useTransition } from '@vueuse/core'
import { PuzzleCast } from '@/components'
import useCarrier from '@/composable/use-carrier'
import { useSceneStore } from '@/store/scene'
import type { Carrier } from '@/types/carrier'
const { state } = defineProps<{
  state: Carrier
}>()
const scene = useSceneStore()
const { source, canLeave, isUpbound, isDownbound, leave } = useCarrier(state)
/**
 * 垂直方向の位置を変化させる
 */
const amount = useTransition(source, {
  duration: 1000,
  transition: TransitionPresets.easeInOutCubic,
  onStarted() {
    scene.leave(state)
  },
  onFinished() {
    scene.arrive(state)
  },
})
/**
 * 適用するスタイル（transformプロパティ）
 */
const transformProperty = computed(() => `translate(0, ${amount.value * scene.riverSize}px)`)
/**
 * 幅（登場人物の幅 * 登場人物の人数 + 登場人物の幅）
 */
const width = computed(() => scene.castSize * state.capacity + scene.castSize)
/**
 * 高さ（登場人物の幅 * 2）
 */
const height = computed(() => scene.castSize * 2.5)
const modelUp = computed(() => canLeave.value && isUpbound.value)
const modelDown = computed(() => canLeave.value && isDownbound.value)
</script>

<template>
  <v-card
    flat
    :style="{ transform: transformProperty }"
    :width="width"
    :height="height"
    color="blue"
  >
    {{ state.id }}
    <div class="d-flex justify-center align-end">
      <PuzzleCast
        v-for="cast in state.status.passengers"
        :key="cast.id"
        :state="cast"
      ></PuzzleCast>
    </div>
    <v-menu
      activator="parent"
      v-model="modelUp"
      disabled
      location="top"
      transition="scroll-y-reverse-transition"
    >
      <div class="d-flex justify-center bg-transparent">
        <v-expand-transition mode="out-in">
          <v-btn
            size="x-large"
            icon="mdi-arrow-up"
            color="blue"
            @click="leave()"
          ></v-btn>
        </v-expand-transition>
      </div>
    </v-menu>
    <v-menu
      activator="parent"
      v-model="modelDown"
      disabled
      location="bottom"
      transition="scroll-y-transition"
    >
      <div class="d-flex justify-center bg-transparent">
        <v-expand-transition mode="in-out">
          <v-btn
            size="x-large"
            icon="mdi-arrow-down"
            color="blue"
            @click="leave()"
          ></v-btn>
        </v-expand-transition>
      </div>
    </v-menu>
  </v-card>
</template>


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
const { y, canLeave, isUpbound, isDownbound, leave } = useCarrier(state)
/** 垂直方向の位置を変化させる */
const amount = useTransition(y, {
  duration: 1000,
  transition: TransitionPresets.easeInOutCubic,
  onStarted() {
    scene.leave(state)
  },
  onFinished() {
    scene.arrive(state)
  },
})
/** 適用するスタイル（transformプロパティ） */
const transformProperty = computed(() => `translate(0, ${amount.value * scene.riverSize}px)`)
/** サイズ（登場人物の幅 * 登場人物の人数 + 登場人物の幅） */
const size = computed(() => scene.castSize * state.capacity + scene.castSize)
/** 上方向の矢印が有効かどうか */
const modelUp = computed(() => canLeave.value && isUpbound.value)
/** 下方向の矢印が有効かどうか */
const modelDown = computed(() => canLeave.value && isDownbound.value)
</script>

<template>
  <v-card
    variant="outlined"
    :style="{ transform: transformProperty }"
    :width="size"
    :height="size"
    class="d-flex justify-center align-end bg-transparent"
  >
    <v-img :src="state.appearance">
      <v-sheet
        class="d-flex justify-center align-center bg-transparent"
        :height="size"
      >
        <PuzzleCast
          v-for="cast in state.status.passengers"
          :key="cast.id"
          :state="cast"
        ></PuzzleCast>
      </v-sheet>
    </v-img>
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
            size="large"
            icon="mdi-arrow-up"
            color="orange"
            @click="leave"
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
            size="large"
            icon="mdi-arrow-down"
            color="orange"
            @click="leave"
          ></v-btn>
        </v-expand-transition>
      </div>
    </v-menu>
  </v-card>
</template>


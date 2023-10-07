<script lang="ts" setup>
import { computed, toRefs, ref, watch } from 'vue'
import { TransitionPresets, useTransition } from '@vueuse/core'
import { PuzzleCast } from '@/components'
import useCarrier from '@/composable/use-carrier'
import { useSceneStore } from '@/store/scene'
import type { Carrier } from '@/types/carrier'
const { state } = defineProps<{
  state: Carrier
}>()
const scene = useSceneStore()
/** 上方向の矢印が有効かどうか */
const modelUp = ref(false)
/** 下方向の矢印が有効かどうか */
const modelDown = ref(false)
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
watch(
  () => (canLeave.value && isUpbound.value),
  (value) => {
    modelUp.value = value
    console.log(`Carrier: modelUp ${modelUp.value}`)
  }
)
watch(
  () => (canLeave.value && isDownbound.value),
  (value) => {
    modelDown.value = value
    console.log(`Carrier: modelDown ${modelDown.value}`)
  }
)
</script>

<template>
  <v-card
    variant="outlined"
    :style="{ transform: transformProperty }"
    :width="size"
    :height="size * 1.25"
    class="d-flex justify-center align-end bg-transparent"
  >
    <v-img :src="state.appearance">
      <v-sheet
        class="d-flex justify-center align-end bg-transparent"
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
            size="default"
            icon="mdi-arrow-up"
            color="orange"
            class="ma-1"
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
            size="default"
            icon="mdi-arrow-down"
            color="orange"
            class="ma-1"
            @click="leave"
          ></v-btn>
        </v-expand-transition>
      </div>
    </v-menu>
  </v-card>
</template>


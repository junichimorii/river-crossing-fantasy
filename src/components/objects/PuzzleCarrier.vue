<script lang="ts" setup>
import { computed } from 'vue'
import { TransitionPresets, useTransition } from '@vueuse/core'
import { PuzzleCast } from '@/components'
import useCarrier from '@/composables/use-carrier'
import { useRecordsStore } from '@/store/records'
import { useSceneStore } from '@/store/scene'
import type { Carrier } from '@/types/carrier'
const { state } = defineProps<{
  state: Carrier
}>()
const records = useRecordsStore()
const scene = useSceneStore()
const { y, upbound, downbound, leave } = useCarrier(state)
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
/** 乗り物が出発できるかどうか（乗り物を操作できる人物が乗っており、乗り物が進行中でない） */
const canLeave = computed(() => !state.status.isSailing && state.status.passengers.some(cast => cast.role.canRow))
/** 舟を漕げる登場人物が乗っていない時にヒントを表示する */
const showHintGetOnRower = computed(() => records.hasActivity('gotOn') && !records.hasActivity('gotOnRower') && canLeave.value)
/** 舟が出航できる時にヒントを表示する */
const showHintLeave = computed(() => records.hasActivity('gotOnRower') && !records.hasActivity('left') && canLeave.value)
/** 川幅（乗り物が往復する距離） */
const riverWidth = computed(() => scene.stageSize * 0.3)
/** v-cardに適用するCSS transformプロパティ */
const transformCard = computed(() => `translate(0, ${amount.value * riverWidth.value}px)`)
/** 幅（登場人物の幅 * 登場人物の人数 + 登場人物の幅 / 2） */
const width = computed(() => scene.castWidth * state.capacity + scene.castWidth * 0.5)
/** 高さ（登場人物の高さ） */
const height = computed(() => scene.castWidth * 2.25)
/** アスペクト比 */
const aspectRatio = computed(() => width.value / height.value)
</script>
<template>
  <v-card
    flat
    :width="width"
    :style="{ transform: transformCard }"
    class="d-flex justify-center align-start bg-transparent"
  >
    <v-img
      :aspect-ratio="aspectRatio"
      :src="state.appearance"
      :height="height"
      >
      <v-sheet
        class="d-flex justify-center align-start bg-transparent"
        :height="height"
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
      :close-on-content-click="false"
      disabled
      location="top"
      v-model="upbound"
      persistent
      transition="scroll-y-reverse-transition"
    >
      <div class="d-flex justify-center">
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
      :close-on-content-click="false"
      disabled
      location="bottom"
      v-model="downbound"
      persistent
      transition="scroll-y-transition"
    >
      <div class="d-flex justify-center">
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
    <v-tooltip
      activator="parent"
      v-model="showHintGetOnRower"
      location="end"
    >
      <v-icon
        icon="mdi-arrow-left"
      ></v-icon>
      舟を漕げるキャラクターが乗っていない場合は移動することができません。
    </v-tooltip>
    <v-tooltip
      activator="parent"
      v-model="showHintLeave"
      location="end"
    >
      <v-icon
        icon="mdi-arrow-left"
      ></v-icon>
      ボタンをタップすると対岸へ移動します。
    </v-tooltip>
  </v-card>
</template>


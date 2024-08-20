<script lang="ts" setup>
import sprites from '@/assets/images/carriers'
import { useAppearance, useCarrierAppearance, useCarrierState, useCasts, useScene } from '@/composables'
import { useSceneStore } from '@/stores/scene'
import type { Carrier } from '@/types'
import { TransitionPresets } from '@vueuse/core'
const props = defineProps<{
  state: Carrier
}>()
const store = useSceneStore()
const { stageSize } = useAppearance()
const { width, height, aspectRatio } = useCarrierAppearance(props.state)
const { coord } = useCarrierState(toRef(store.state))
const { passengers } = useCasts(toRef(store.state), toRef(store.scene))
const { arrive } = useScene(toRef(store.state), toRef(store.scene))

/** useTransitionで変化させるY座標 */
 const source = computed(() => coord(props.state))

/** 垂直方向の位置を変化させる */
const amount = useTransition(source, {
  duration: 1000,
  transition: TransitionPresets.easeInOutCubic,
  onStarted() {
    store.disabled = true
  },
  onFinished() {
    store.disabled = false
    finished()
  },
})

/** v-cardに適用するCSS transformプロパティ */
const transform = computed(() => {
  const ratio = 1 - ((amount.value + 1) * 0.05)
  return `translate(0, ${-amount.value * stageSize.value * 0.1 + stageSize.value * 0.1}px) scale(${ratio}, ${ratio})`
})

/** 乗り物の動作が停止した時 */
const finished = async () => {
  const result = await arrive(props.state)
  if(result !== undefined) {
    store.moves.add(result)
  }
}
</script>

<template>
  <v-card
    flat
    :width="width"
    :style="{ transform: transform }"
    class="d-flex justify-center align-start bg-transparent"
  >
    <v-img
      :src="sprites[state.appearance]"
      :width="width"
      :aspect-ratio="aspectRatio"
      :height="height"
    >
      <v-sheet
        class="d-flex justify-center align-center bg-transparent"
        :height="height"
      >
        <PuzzleCast
          v-for="cast in passengers[state.id]"
          :key="cast.id"
          :state="cast"
        />
      </v-sheet>
    </v-img>
    <PuzzleCarrierMenu :state="state" />
    <PuzzleCarrierTooltip :state="state" />
  </v-card>
</template>


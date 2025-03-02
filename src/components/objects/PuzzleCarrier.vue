<script lang="ts" setup>
import sprites from '@/assets/images/carriers';
import { useAppearance, useCarrierAppearance, useCarrierState, useCrews, useScene } from '@/composables';
import { useSceneStore } from '@/stores/scene';
import type { Carrier } from '@/types';
const props = defineProps<{
  state: Carrier
}>()
const { state: carrier } = toRefs(props)
const { state: sceneState, scene, moves, disabled } = storeToRefs(useSceneStore())
const { stageSize } = useAppearance()
const { width, height, aspectRatio } = useCarrierAppearance(carrier)
const { coord } = useCarrierState(sceneState)
const { passengers } = useCrews(sceneState, scene)
const { arrive } = useScene(sceneState, scene)

/** useTransitionで変化させるY座標 */
const source = computed(() => coord(carrier.value))

/** 垂直方向の位置を変化させる */
const amount = useTransition(source, {
  duration: 1000,
  transition: TransitionPresets.easeInOutCubic,
  onStarted() {
    disabled.value = true
  },
  onFinished() {
    disabled.value = false
    finished()
  },
})

/** 大きさ */
const ratio = computed(() => 1 - ((amount.value + 1) * 0.05))
/** CSS translate */
const translate = computed(() => `0 ${-amount.value * stageSize.value * 0.1 + stageSize.value * 0.1}px`)
/** CSS scale */
const scale = computed(() => `${ratio.value} ${ratio.value}`)

/** 乗り物の動作が停止した時 */
const finished = async () => {
  const result = await arrive(carrier.value)
  if(result !== undefined) {
    moves.value.add(result)
  }
}
</script>

<template>
  <v-card
    flat
    :width="width"
    :style="{ translate, scale }"
    class="d-flex justify-center align-start bg-transparent"
  >
    <v-img
      :src="sprites[carrier.appearance]"
      :width="width"
      :aspect-ratio="aspectRatio"
      :height="height"
    >
      <v-sheet
        class="d-flex justify-center align-center bg-transparent"
        :height="height"
      >
        <PuzzleCrew
          v-for="crew in passengers[carrier.id]"
          :key="crew.id"
          :state="crew"
        />
      </v-sheet>
    </v-img>
    <PuzzleCarrierMenu :state="carrier" />
    <PuzzleCarrierTooltip :state="carrier" />
  </v-card>
</template>


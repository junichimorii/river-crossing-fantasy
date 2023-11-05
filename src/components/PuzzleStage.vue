<script lang="ts" setup>
import { toRef } from 'vue'
import { SceneToolber, PuzzleCast, PuzzleCarrier } from '@/components'
import { useAppearance, useCasts } from '@/composables'
import { useSceneStore } from '@/store/scene'
const scene = useSceneStore()
const { stageSize } = useAppearance(scene.state)
const { unreachers, reachers } = useCasts(toRef(scene.state))
</script>

<template>
  <v-img
    cover
    :src="scene.state.landscape"
    :height="stageSize"
  >
    <SceneToolber></SceneToolber>
    <v-sheet
      class="d-flex justify-center align-start bg-transparent"
      :height="stageSize"
    >
      <v-sheet
        class="d-flex flex-column bg-transparent"
        :width="stageSize * 0.9"
      >
        <v-sheet
          class="d-flex justify-center align-end order-3 bg-transparent"
          :height="stageSize * 0.4"
        >
          <PuzzleCarrier
            v-for="carrier in scene.state.carriers"
            :key="carrier.id"
            :state="carrier"
          ></PuzzleCarrier>
        </v-sheet>
        <v-sheet
          class="d-flex justify-end align-end order-2 bg-transparent"
          :height="stageSize * 0.35"
        >
          <PuzzleCast
            v-for="cast in reachers"
            :key="cast.id"
            :state="cast"
          ></PuzzleCast>
        </v-sheet>
        <v-sheet
          class="d-flex justify-start align-end order-4 bg-transparent"
          :height="stageSize * 0.2"
        >
          <PuzzleCast
            v-for="cast in unreachers"
            :key="cast.id"
            :state="cast"
          ></PuzzleCast>
        </v-sheet>
      </v-sheet>
    </v-sheet>
  </v-img>
</template>
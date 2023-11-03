<script lang="ts" setup>
import { SceneCounter, PuzzleCast, PuzzleCarrier } from '@/components'
import { usePuzzle, useStage } from '@/composables'
import { usePuzzleStore } from '@/store/puzzle'
const puzzle = usePuzzleStore()
const { unreachers, reachers, carriers } = usePuzzle(puzzle.scene)
const { stageSize } = useStage(puzzle.scene)
</script>

<template>
  <v-img
    v-if="puzzle.scene"
    cover
    :src="puzzle.scene.landscape"
  >
    <v-sheet
      class="d-flex justify-center align-start bg-transparent"
      :height="stageSize"
    >
      <v-sheet
        class="d-flex flex-column bg-transparent"
        :width="stageSize * 0.9"
      >
        <v-sheet
          class="d-flex justify-start align-center order-1 bg-transparent"
          :height="stageSize * 0.1"
        >
          <SceneCounter></SceneCounter>
        </v-sheet>
        <v-sheet
          class="d-flex justify-center align-end order-3 bg-transparent"
          :height="stageSize * 0.4"
        >
          <PuzzleCarrier
            v-for="carrier in carriers"
            :key="carrier.id"
            :state="carrier"
          ></PuzzleCarrier>
        </v-sheet>
        <v-sheet
          class="d-flex justify-end align-end order-2 bg-transparent"
          :height="stageSize * 0.25"
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
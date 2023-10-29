<script lang="ts" setup>
import { useSceneStore } from '@/store/scene'
import { SceneCounter, PuzzleCast, PuzzleCarrier } from '@/components'
const scene = useSceneStore()
</script>

<template>
  <v-img
    cover
    :src="scene.state.landscape"
  >
    <v-sheet
      class="d-flex justify-center align-start bg-transparent"
      :height="scene.stageSize"
    >
      <v-sheet
        class="d-flex flex-column bg-transparent"
        :width="scene.stageSize * 0.9"
      >
        <v-sheet
          class="d-flex justify-start align-center order-1 bg-transparent"
          :height="scene.stageSize * 0.1"
        >
          <SceneCounter></SceneCounter>
        </v-sheet>
        <v-sheet
          class="d-flex justify-center align-end order-3 bg-transparent"
          :height="scene.stageSize * 0.4"
        >
          <PuzzleCarrier
            v-for="carrier in scene.state.carriers"
            :key="carrier.id"
            :state="carrier"
          ></PuzzleCarrier>
        </v-sheet>
        <v-sheet
          class="d-flex justify-end align-end order-2 bg-transparent"
          :height="scene.stageSize * 0.25"
        >
          <PuzzleCast
            v-for="cast in scene.reachers"
            :key="cast.id"
            :state="cast"
          ></PuzzleCast>
        </v-sheet>
        <v-sheet
          class="d-flex justify-start align-end order-4 bg-transparent"
          :height="scene.stageSize * 0.2"
        >
          <PuzzleCast
            v-for="cast in scene.unreachers"
            :key="cast.id"
            :state="cast"
          ></PuzzleCast>
        </v-sheet>
      </v-sheet>
    </v-sheet>
  </v-img>
</template>
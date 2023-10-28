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
    <div class="d-flex justify-center align-center">
      <v-sheet
        class="bg-transparent"
        :width="scene.stageSize * 0.9"
        :height="scene.stageSize"
      >
        <v-sheet
          class="d-flex justify-start align-center bg-transparent"
          :height="scene.stageSize * 0.1"
        >
          <SceneCounter></SceneCounter>
        </v-sheet>
        <v-sheet
          class="d-flex justify-end align-end bg-transparent"
          :height="scene.stageSize * 0.25"
        >
          <PuzzleCast
            v-for="cast in scene.reachers"
            :key="cast.id"
            :state="cast"
          ></PuzzleCast>
        </v-sheet>
        <v-sheet
          class="d-flex justify-center align-end bg-transparent"
          :height="scene.stageSize * 0.4"
        >
          <PuzzleCarrier
            v-for="carrier in scene.state.carriers"
            :key="carrier.id"
            :state="carrier"
          ></PuzzleCarrier>
        </v-sheet>
        <v-sheet
          class="d-flex justify-start align-end bg-transparent"
          :height="scene.stageSize * 0.2"
        >
          <PuzzleCast
            v-for="cast in scene.unreachers"
            :key="cast.id"
            :state="cast"
          ></PuzzleCast>
        </v-sheet>
      </v-sheet>
    </div>
  </v-img>
</template>
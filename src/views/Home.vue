<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core'
import { useSettingStore } from '@/store/setting'
import { useSceneStore } from '@/store/scene'
import { PuzzleCast, PuzzleCarrier } from '@/components'
const { width, height } = useWindowSize()
const { load } = useSettingStore()
const scene = useSceneStore()
const setting = await load()
await scene.init(setting)
</script>

<template>
  <v-sheet color="green">
    <v-sheet class="d-flex justify-end align-end" :min-height="height * 0.2">
      <PuzzleCast
        v-for="cast in scene.destinationCasts"
        :key="cast.id"
        :state="cast"
      ></PuzzleCast>
    </v-sheet>
    {{ scene.destinationCasts }}
    <v-sheet class="d-flex justify-center align-end" :min-height="height * 0.4">
      <PuzzleCarrier
        v-for="carrier in scene.state.carriers"
        :key="carrier.id"
        :state="carrier"
      ></PuzzleCarrier>
    </v-sheet>
    {{ scene.state.carriers }}
    <v-sheet class="d-flex justify-start align-end" :min-height="height * 0.2">
      <PuzzleCast
        v-for="cast in scene.originCasts"
        :key="cast.id"
        :state="cast"
      ></PuzzleCast>
    </v-sheet>
    {{ scene.originCasts }}
  </v-sheet>
</template>


<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useSettingStore } from '@/store/setting'
import { useSceneStore } from '@/store/scene'
import { PuzzleCast, PuzzleCarrier } from '@/components'
const { id } = defineProps<{
  id: string
}>()
const { load } = useSettingStore()
const scene = useSceneStore()
await load(id)
.then(setting => {
  scene.init(setting)
}).catch(() => {
  useRouter().push({ path: '/home' })
})
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
          class="d-flex justify-end align-start bg-transparent"
          :height="scene.stageSize * 0.4"
        >
          <PuzzleCast
            v-for="cast in scene.destinationCasts"
            :key="cast.id"
            :state="cast"
          ></PuzzleCast>
        </v-sheet>
        <v-sheet
          class="d-flex justify-center align-center bg-transparent"
          :height="scene.stageSize * 0.3"
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
            v-for="cast in scene.originCasts"
            :key="cast.id"
            :state="cast"
          ></PuzzleCast>
        </v-sheet>
      </v-sheet>
    </div>
  </v-img>
</template>
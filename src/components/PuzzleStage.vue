<script lang="ts" setup>
import sprites from '@/assets/images/landscapes';
import { useAppearance, useCasts } from '@/composables';
import { useSceneStore } from '@/stores/scene';
import { useSessionStore } from '@/stores/session';
const { state, scene } = storeToRefs(useSceneStore())
const { state: session } = storeToRefs(useSessionStore())
const { stageSize } = useAppearance()
const { unreachers, reachers, halfways } = useCasts(state, scene)
const landscape = computed(() => scene.value.landscape?.night
  ? sprites.nightBridge
  : scene.value.landscape?.island
    ? sprites.daytimeRiverIsland
    : sprites.daytimeRiver
)
onMounted(async () => {
  session.value.navigation = false
  session.value.moves = false
  session.value.sound = false
  session.value.solve = false
})
</script>

<template>
  <v-img
    cover
    :src="landscape"
    :height="stageSize"
  >
    <SceneToolbar />
    <v-sheet
      id="puzzle-container"
      :height="stageSize"
      class="d-flex justify-center align-start bg-transparent"
    >
      <v-sheet
        id="puzzle-stage"
        :width="stageSize * 0.96"
        :height="stageSize"
        class="d-flex flex-column bg-transparent"
      >
        <!-- destination -->
        <v-sheet
          id="stage-destination"
          :height="stageSize * 0.3"
          class="d-flex justify-end align-end order-1 bg-transparent"
        >
          <PuzzleCast
            v-for="cast in reachers"
            :key="cast.id"
            :state="cast"
            :style="{ transform: 'scale(0.85, 0.85)', 'transform-origin': 'bottom center' }"
          />
        </v-sheet>
        <!-- river -->
        <v-sheet
          id="stage-river"
          :height="stageSize * 0.45"
          class="d-flex justify-center align-start order-2 bg-transparent"
        >
          <v-row no-gutters>
            <v-col
              :cols="scene.landscape?.island ? 8 : false"
              class="d-flex justify-end align-self-center"
            >
              <PuzzleCast
                v-for="cast in halfways"
                :key="cast.id"
                :state="cast"
              />
            </v-col>
            <v-col
              class="d-flex justify-center"
            >
              <PuzzleCarrier
                v-for="carrier in scene.carriers"
                :key="carrier.id"
                :state="carrier"
              />
            </v-col>
            <v-col>
              <v-sheet
                :height="stageSize * 0.45"
                class="bg-transparent"
              />
            </v-col>
          </v-row>
        </v-sheet>
        <!-- origin -->
        <v-sheet
          id="stage-origin"
          :width="stageSize * 0.96"
          :height="stageSize * 0.2"
          class="d-flex justify-start align-end order-3 bg-transparent"
        >
          <PuzzleCast
            v-for="cast in unreachers"
            :key="cast.id"
            :state="cast"
          />
        </v-sheet>
      </v-sheet>
    </v-sheet>
  </v-img>
</template>

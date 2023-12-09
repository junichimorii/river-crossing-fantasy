<script lang="ts" setup>
import { computed, onMounted, toRef } from 'vue'
import sprites from '@/assets/images/landscapes'
import { SceneToolber, PuzzleCast, PuzzleCarrier } from '@/components'
import { useAppearance, useCasts } from '@/composables'
import { useSceneStore } from '@/store/scene'
import { useSessionStore } from '@/store/session'
const store = useSceneStore()
const session = useSessionStore()
const { stageSize } = useAppearance()
const { unreachers, reachers, halfways } = useCasts(toRef(store.state), toRef(store.scene))
const landscape = computed(() => store.scene.landscape?.night
  ? sprites.nightBridge
  : store.scene.landscape?.island
    ? sprites.daytimeRiverIsland
    : sprites.daytimeRiver
)
onMounted(async () => {
  session.state.navigation = false
  session.state.sound = false
  session.state.solve = false
})
</script>

<template>
  <v-img
    cover
    :src="landscape"
    :height="stageSize"
  >
    <SceneToolber></SceneToolber>
    <v-sheet
      class="d-flex justify-center align-start bg-transparent"
      :height="stageSize"
    >
      <v-sheet
        class="d-flex flex-column bg-transparent"
        :width="stageSize * 0.95"
      >
        <!-- destination -->
        <v-sheet
          class="d-flex justify-end align-end order-1 bg-transparent"
          :height="stageSize * 0.3"
        >
          <PuzzleCast
            v-for="cast in reachers"
            :key="cast.id"
            :state="cast"
          ></PuzzleCast>
        </v-sheet>
        <!-- river -->
        <v-sheet
          class="d-flex justify-center align-start order-2 bg-transparent"
          :height="stageSize * 0.45"
        >
          <v-row no-gutters>
            <v-col
              :cols="store.scene.landscape?.island ? 8 : false"
              class="d-flex justify-end align-self-center"
            >
              <PuzzleCast
                v-for="cast in halfways"
                :key="cast.id"
                :state="cast"
              ></PuzzleCast>
            </v-col>
            <v-col
              class="d-flex justify-center"
            >
              <PuzzleCarrier
                v-for="carrier in store.scene.carriers"
                :key="carrier.id"
                :state="carrier"
              ></PuzzleCarrier>
            </v-col>
            <v-col>
              <v-sheet
                class="bg-transparent"
                :height="stageSize * 0.45"
              >
              </v-sheet>
            </v-col>
          </v-row>
        </v-sheet>
        <!-- origin -->
        <v-sheet
          class="d-flex justify-start align-end order-3 bg-transparent"
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
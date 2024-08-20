<script lang="ts" setup>
import { useAppearance, useMoves } from '@/composables';
import { useRecordsStore } from '@/stores/records';
import { useSceneStore } from '@/stores/scene';
const { report } = useRecordsStore()
const { scene, moves } = storeToRefs(useSceneStore())
const { init } = useSceneStore()
const { stageSize } = useAppearance()
const { count } = useMoves(moves)
const score = ref(0)
const result = computed(() => includes('failed')
  ? 'failed'
  : includes('succeeded')
    ? 'succeeded'
    : undefined
)
const overlay = computed(() => result.value !== undefined)

const includes = (
  status: string
) => Array.from(moves.value).some(move => move.result === status)

watch(result, async (value) => {
  /** ステージクリア */
  if (value === 'succeeded') {
    score.value = count.value <= scene.value.passing ? 2 : 1
    report(scene.value, score.value)
  }
})
</script>

<template>
  <v-dialog
    v-model="overlay"
    persistent
    class="d-flex justify-center align-start"
  >
    <v-sheet
      :elevation="0"
      :height="stageSize"
      class="d-flex justify-center align-center bg-transparent"
    >
      <v-card class="pa-6 opacity-90">
        <v-card-title
          v-if="result === 'succeeded'"
          class="text-center text-success text-h5 text-sm-h3 py-4"
        >
          STAGE CLEAR
        </v-card-title>
        <v-card-title
          v-if="result === 'failed'"
          class="text-center text-error text-h5 text-sm-h3 py-4"
        >
          FAILED
        </v-card-title>
        <v-card-item class="d-flex justify-center">
          <v-rating
            readonly
            density="compact"
            :length="2"
            size="x-large"
            :model-value="score"
            active-color="orange"
          />
        </v-card-item>
        <v-card-actions
          class="d-flex justify-center"
        >
          <v-btn
            v-if="result === 'failed'"
            color="error"
            variant="elevated"
            @click.stop="init()"
          >
            Retry
          </v-btn>
          <v-btn
            color="success"
            variant="elevated"
            to="/home"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-sheet>
  </v-dialog>
</template>

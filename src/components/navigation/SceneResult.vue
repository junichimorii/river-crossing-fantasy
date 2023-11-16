<script lang="ts" setup>
import { computed, ref, toRef, watch } from 'vue'
import { useRecordsStore } from '@/store/records'
import { useAppearance, useMoves } from '@/composables'
import { useSceneStore } from '@/store/scene'
const records = useRecordsStore()
const store = useSceneStore()
const { stageSize } = useAppearance(store.scene)
const { count } = useMoves(toRef(store.moves))
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
) => Array.from(store.moves).some(move => move.result === status)

watch(result, async (value) => {
  /** ステージクリア */
  if (value === 'succeeded') {
    score.value = count.value <= store.scene.passing ? 2 : 1
    records.report(store.scene.id, score.value)
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
      <v-card
        flat
        style="background-color: hsla(0, 0%, 100%, 0.95)"
        class="pa-6"
      >
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
            active-color="tertiary"
          />
        </v-card-item>
        <v-card-actions
          class="d-flex justify-center"
        >
          <v-btn
            v-if="result === 'failed'"
            color="error"
            variant="elevated"
            @click.stop="store.init()"
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
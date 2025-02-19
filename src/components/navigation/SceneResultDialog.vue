<script lang="ts" setup>
import { useMoves } from '@/composables';
import { useRecordsStore } from '@/stores/records';
import { useSceneStore } from '@/stores/scene';
const { report } = useRecordsStore()
const { scene, moves } = storeToRefs(useSceneStore())
const { init } = useSceneStore()
const { count, isSucceeded, isFailed } = useMoves(moves)
const score = ref(0)
const overlay = computed(() => isSucceeded.value || isFailed.value)
watch(isSucceeded, async () => {
  /** ステージクリア */
  score.value = count.value <= scene.value.passing ? 2 : 1
  report(scene.value, score.value)
})
</script>

<template>
  <v-dialog
    v-model="overlay"
    persistent
    class="d-flex justify-center align-center"
  >
    <v-card class="pa-6 opacity-90">
      <v-card-title
        v-if="isSucceeded"
        class="text-center text-success text-h5 text-sm-h3 py-4"
      >
        STAGE CLEAR
      </v-card-title>
      <v-card-title
        v-if="isFailed"
        class="text-center text-error text-h5 text-sm-h3 py-4"
      >
        FAILED
      </v-card-title>
      <v-card-item class="d-flex justify-center">
        <ScoreRating
          :value="score"
          size="x-large"
        />
      </v-card-item>
      <v-card-actions>
        <v-row justify="center">
          <v-col
            cols="12"
            sm="6"
          >
            <v-btn
              block
              variant="elevated"
              color="success"
              size="large"
              prepend-icon="$prev"
              to="/home"
            >
              パズル一覧に戻る
            </v-btn>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-btn
              block
              variant="elevated"
              color="warning"
              size="large"
              prepend-icon="$restart"
              @click.stop="init()"
            >
              最初から始める
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

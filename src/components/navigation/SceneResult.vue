<script lang="ts" setup>
import { computed } from 'vue'
import { useSceneStore } from '@/store/scene'
const scene = useSceneStore()
/** クリア時にオーバーレイを表示 */
const overlay = computed(() => scene.activities.has('completed') || scene.activities.has('failed'))
</script>

<template>
  <v-dialog
    v-model="overlay"
    persistent
    class="d-flex justify-center align-start"
  >
    <v-sheet
      :elevation="0"
      :height="scene.stageSize"
      class="d-flex justify-center align-center bg-transparent"
    >
      <v-card
        flat
        style="background-color: hsla(0, 0%, 100%, 0.9)"
        class="pa-6"
      >
        <v-card-title
          v-if="scene.activities.has('completed')"
          class="text-center text-success text-h5 text-sm-h3 py-4"
        >
          STAGE CLEAR
        </v-card-title>
        <v-card-title
          v-if="scene.activities.has('failed')"
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
            :model-value="scene.score"
            active-color="orange"
          />
        </v-card-item>
        <v-card-actions
          class="d-flex justify-center"
        >
          <v-btn
            v-if="scene.activities.has('failed')"
            color="error"
            variant="elevated"
            @click="scene.init"
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
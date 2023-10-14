<script lang="ts" setup>
import { computed } from 'vue'
import { useSceneStore } from '@/store/scene'
const scene = useSceneStore()
/** クリア時にオーバーレイを表示 */
const overlay = computed(() => scene.activities.has('completed'))
</script>

<template>
  <v-dialog
    v-model="overlay"
    persistent
    class="d-flex justify-center align-start bg-transparent"
  >
    <v-sheet
      :elevation="0"
      :height="scene.stageSize"
      class="d-flex justify-center align-center bg-transparent"
    >
      <v-card
        flat
      >
        <v-card-title
          class="text-teal text-h5 text-sm-h3 py-3"
        >
          stage clear
        </v-card-title>
        <v-card-actions>
          <v-btn
            block
            size="x-large"
            color="primary"
            to="/home"
          >OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-sheet>
  </v-dialog>
</template>
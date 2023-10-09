<script lang="ts" setup>
import { computed } from 'vue'
import { PuzzleConditions } from '@/components'
import { useSceneStore } from '@/store/scene'
const scene = useSceneStore()
/** 初回実行時のみダイアログを表示 */
const dialog = computed(() => !scene.records.has('started'))
</script>

<template>
  <v-dialog
    v-model="dialog"
    persistent
    width="auto"
  >
    <v-card>
      <PuzzleConditions></PuzzleConditions>
      <v-card-actions>
        <v-btn color="primary" block @click="scene.start">Start</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
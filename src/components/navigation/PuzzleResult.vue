<script lang="ts" setup>
import { computed } from 'vue'
import { useSceneStore } from '@/store/scene'
const scene = useSceneStore()
/** クリア時にオーバーレイを表示 */
const overlay = computed(() => scene.actions.has('completed'))
</script>

<template>
  <v-overlay
    v-model="overlay"
    contained
    persistent
    class="d-flex justify-center align-center"
  >
    <v-card
      flat
      class="bg-transparent"
    >
      <v-card-title>
        stage clear
      </v-card-title>
      <v-card-actions>
        <v-btn color="primary" block to="/home">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-overlay>
</template>
<script lang="ts" setup>
import { useSceneStore } from '@/store/scene'
const scene = useSceneStore()
</script>

<template>
  <v-card flat class="overflow-y-auto bg-transparent">
    <v-card-item>
      <v-list-item title="最初から始める" @click="scene.start()">
        <template v-slot:prepend>
          <v-icon icon="mdi-restart"></v-icon>
        </template>
      </v-list-item>
    </v-card-item>
    <v-card-item>
      <v-list-item title="パズル一覧に戻る" to="/home">
        <template v-slot:prepend>
          <v-icon icon="mdi-home"></v-icon>
        </template>
      </v-list-item>
    </v-card-item>
  </v-card>
</template>
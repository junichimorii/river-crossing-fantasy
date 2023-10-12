<script lang="ts" setup>
import { useSceneStore } from '@/store/scene'
const { start } = useSceneStore()
</script>

<template>
  <v-card
    flat
    prepend-icon="mdi-cog"
    class="overflow-y-auto bg-transparent"
    title="オプション"
  >
    <v-divider></v-divider>
    <v-card-text>
      <v-list>
        <v-list-item title="最初から始める" @click="start">
          <template v-slot:prepend>
            <v-icon icon="mdi-restart"></v-icon>
          </template>
        </v-list-item>
        <v-list-item title="パズル一覧に戻る" to="/home">
          <template v-slot:prepend>
            <v-icon icon="mdi-home"></v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>
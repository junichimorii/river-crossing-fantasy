<script lang="ts" setup>
import { useSceneStore } from '@/store/scene'
const scene = useSceneStore()
</script>

<template>
  <v-card
    flat
    title="オプション"
    class="overflow-y-auto"
  >
    <template v-slot:prepend>
      <v-icon icon="mdi-cog"></v-icon>
    </template>
    <v-divider></v-divider>
    <v-card-item>
      <v-list
        class="bg-transparent"
      >
        <v-list-item
          title="最初から始める"
          @click="scene.init"
        >
          <template v-slot:prepend>
            <v-icon icon="mdi-restart"></v-icon>
          </template>
        </v-list-item>
        <v-list-item
          title="パズル一覧に戻る"
          to="/home"
        >
          <template v-slot:prepend>
            <v-icon icon="mdi-home"></v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-card-item>
  </v-card>
</template>
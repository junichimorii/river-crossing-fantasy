<script lang="ts" setup>
import { computed } from 'vue'
import { useSceneStore } from '@/store/scene'
const scene = useSceneStore()
const color = computed(() => scene.count <= scene.state.passing ? 'success' : 'error')
</script>

<template>
  <v-toolbar
    absolute
    class="bg-transparent"
  >
    <template v-slot:prepend>
      <v-chip
        variant="text"
        :color="color"
        style="font-size: 5vmin;"
      >
        {{ scene.count }}
      </v-chip>
    </template>
    <template v-slot:append>
      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template>
  </v-toolbar>
</template>
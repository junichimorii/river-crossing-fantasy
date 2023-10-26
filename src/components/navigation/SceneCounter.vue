<script lang="ts" setup>
import { useSceneStore } from '@/store/scene'
const scene = useSceneStore()
</script>

<template>
  <v-card
    flat
    class="bg-transparent"
  >
    <v-card-title
      :class="scene.state.category === 'time-limited' ? 'text-white' : 'text-black'"
      style="font-size: 5vmin;"
    >
      {{ scene.count }}
    </v-card-title>
  </v-card>
</template>
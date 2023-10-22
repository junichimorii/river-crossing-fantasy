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
      class="text-h6 text-sm-h4 pa-0"
      :class="scene.state.category === 'time-limited' ? 'text-white' : 'text-black'"
    >
      {{ scene.count }}
    </v-card-title>
  </v-card>
</template>
<script lang="ts" setup>
import { usePuzzleStore } from '@/store/puzzle'
const puzzle = usePuzzleStore()
</script>

<template>
  <v-card
    flat
    class="bg-transparent"
  >
    <v-card-title
      :class="puzzle.scene.category === 'time-limited' ? 'text-white' : 'text-black'"
      style="font-size: 5vmin;"
    >
      {{ puzzle.count }}
    </v-card-title>
  </v-card>
</template>
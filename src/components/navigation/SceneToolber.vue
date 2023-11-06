<script lang="ts" setup>
import { toRef } from 'vue'
import { useMoves } from '@/composables'
import { useSceneStore } from '@/store/scene'
const store = useSceneStore()
const { count, color } = useMoves(toRef(store.moves), toRef(store.scene))
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
        {{ count }}
      </v-chip>
    </template>
    <template v-slot:append>
      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template>
  </v-toolbar>
</template>
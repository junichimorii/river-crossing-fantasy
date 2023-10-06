<script lang="ts" setup>
import { useSceneStore } from '@/store/scene'
const scene = useSceneStore()
</script>

<template>
  <v-toolbar
    color="green"
    transition="slide-y-transition"
  >
    <v-toolbar-title>
      <v-chip color="white">
        Q{{scene.state.id}}
      </v-chip>
      {{ scene.state.title }}
    </v-toolbar-title>
  </v-toolbar>
</template>
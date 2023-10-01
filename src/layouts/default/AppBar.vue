<script lang="ts" setup>
import { onMounted, ref } from 'vue'
const isLandscape = ref<boolean>(false)
const onResize = () => {
  isLandscape.value = window.innerWidth > window.innerHeight
}
onMounted(() => {
  onResize()
})
</script>

<template>
  <v-app-bar
    :model-value="!isLandscape"
    v-resize="onResize"
    transition="slide-y-transition"
  >
    <v-app-bar-title>
      <v-icon icon="mdi-puzzle" />
      River Crossing Puzzles
    </v-app-bar-title>
  </v-app-bar>
</template>
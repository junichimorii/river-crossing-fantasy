<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useSceneStore } from '@/store/scene'
const scene = useSceneStore()
const snackbar = ref(false)
watch(
  () => scene.hintText,
  () => {
    if (scene.hintText !== '') snackbar.value = true
  },
  { immediate: true }
)
</script>

<template>
  <v-snackbar
    v-model="snackbar"
    location="top"
    color="green"
    :timeout="10000"
  >
    {{ scene.hintText }}
    <template v-slot:actions>
      <v-btn
        color="pink"
        variant="text"
        @click="snackbar = false"
      >
        OK
      </v-btn>
    </template>
  </v-snackbar>
</template>
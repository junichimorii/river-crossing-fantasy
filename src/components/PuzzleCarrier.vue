<script lang="ts" setup>
import { computed, ref, Ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
// import { useSceneStore } from '@/store/scene'
import { PuzzleCast } from '@/components'
import type { Carrier } from '@/types/carrier'
const props = defineProps<{
  state: Carrier
}>()
// const scene = useSceneStore()
const { width: windowWidth, height: windowHeight } = useWindowSize()
const size = computed(() => windowWidth.value < windowHeight.value ? windowWidth.value : windowHeight.value)
const width = computed(() => size.value / 10 * props.state.capacity)  // 乗り物の幅
const height = computed(() => width.value * 4 / 3)  // 乗り物の高さ
const menu = true
</script>

<template>
  <v-card
    :width="width"
    :height="height"
    color="blue"
  >
    {{ state.id }}
    <v-sheet class="d-flex justify-center">
      <PuzzleCast
        v-for="cast in state.status.passengers"
        :key="cast.id"
        :state="cast"
      ></PuzzleCast>
      <v-menu
        activator="parent"
        v-model="menu"
        location="end"
        :height="height"
      >
        <v-sheet class="d-flex justify-center bg-transparent">
          <v-icon icon="mdi-arrow-right"></v-icon>
        </v-sheet>
      </v-menu>
    </v-sheet>
  </v-card>
</template>


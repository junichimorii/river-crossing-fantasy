<script lang="ts" setup>
import { toRef } from 'vue'
import { SceneMoves } from '@/components'
import { useSolve } from '@/composables'
import type { Scene } from '@/types'
const props = defineProps<{
  scene: Scene
}>()
const { moves, solve } = useSolve(toRef(props.scene))
</script>

<template>
  <v-card
    flat
    subtitle="ルート探索"
  >
    <template v-slot:prepend>
      <v-icon icon="mdi-map-search"></v-icon>
    </template>
    <v-card-item>
      <v-btn
        block
        color="info"
        size="large"
        prepend-icon="mdi-map-search"
        @click="solve()"
      >
        探索開始
      </v-btn>
    </v-card-item>
    <SceneMoves
      v-if="moves.size > 0"
      :moves="moves"
      :category="scene.category"
    ></SceneMoves>
  </v-card>
</template>
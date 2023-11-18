<script lang="ts" setup>
import { toRef } from 'vue'
import { SceneMoves } from '@/components'
import { useSolve } from '@/composables'
import { useSessionStore } from '@/store/session'
import type { Scene } from '@/types'
const props = defineProps<{
  scene: Scene
}>()
const session = useSessionStore()
const { solutions, solved, solve } = useSolve(toRef(props.scene))
</script>

<template>
  <v-dialog
    v-model="session.state.solve"
    scrollable
    :retain-focus="false"
    class="d-flex justify-center align-center"
  >
    <v-card
      flat
      title="ルート探索"
    >
      <template v-slot:prepend>
        <v-icon icon="mdi-map-search"></v-icon>
      </template>
      <v-card-actions
        class="d-flex justify-center"
      >
        <v-btn
          prepend-icon="mdi-map-search"
          color="info"
          @click.stop="solve()"
        >
          探索開始
        </v-btn>
        <v-btn
          prepend-icon="mdi-close"
          color="error"
          @click.stop="session.state.solve = false"
        >
          閉じる
        </v-btn>
      </v-card-actions>
      <v-alert
        v-if="!solved"
        type="error"
        title="Failed."
      ></v-alert>
      <v-card-text
        class="pa-0"
      >
        <v-card-item
          v-for="(moves, i) in solutions"
          :key="i"
          class="px-0"
        >
          <v-card-subtitle class="px-3">
            回数: {{ moves.size }}
          </v-card-subtitle>
          <SceneMoves
            :moves="moves"
            :category="scene.category"
          ></SceneMoves>
        </v-card-item>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
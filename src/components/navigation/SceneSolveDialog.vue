<script lang="ts" setup>
import { useSolve } from '@/composables';
import { useSessionStore } from '@/stores/session';
import type { Scene } from '@/types';
const props = defineProps<{
  scene: Scene
}>()
const { scene } = toRefs(props)
const { state: session } = storeToRefs(useSessionStore())
const { solutions, solved, hasTimeLimit, solve } = useSolve(scene)
</script>

<template>
  <v-dialog
    v-model="session.solve"
    scrollable
    :retain-focus="false"
    class="d-flex justify-center align-center"
  >
    <v-card
      flat
      title="ルート探索"
    >
      <template #prepend>
        <v-icon icon="$solve" />
      </template>
      <v-card-actions
        class="d-flex justify-center"
      >
        <v-btn
          prepend-icon="$solve"
          color="info"
          @click.stop="solve()"
        >
          探索開始
        </v-btn>
        <v-btn
          prepend-icon="$close"
          color="error"
          @click.stop="session.solve = false"
        >
          閉じる
        </v-btn>
      </v-card-actions>
      <v-alert
        v-if="!solved"
        type="error"
        title="Failed."
      />
      <v-card-text class="pa-0">
        <v-card-item
          v-for="(moves, i) in solutions"
          :key="i"
          class="px-0"
        >
          <v-card-subtitle class="px-3">
            回数: {{ moves.size }}
            <span v-if="hasTimeLimit">
              / 時間: {{ Array.from(moves).reduce((a, b) => a + b.value, 0) }}
            </span>
          </v-card-subtitle>
          <SceneMoves
            :moves="moves"
            :category="scene.category"
          />
        </v-card-item>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

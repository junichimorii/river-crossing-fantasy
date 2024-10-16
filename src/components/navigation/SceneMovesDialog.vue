<script lang="ts" setup>
import { useSceneStore } from '@/stores/scene';
import { useSessionStore } from '@/stores/session';
const { scene, moves } = storeToRefs(useSceneStore())
const { state: session } = storeToRefs(useSessionStore())
</script>

<template>
  <v-dialog
    v-model="session.moves"
    scrollable
    :retain-focus="false"
    class="d-flex justify-center align-center"
  >
    <v-card
      flat
      title="履歴"
      class="overflow-y-auto opacity-90"
    >
      <template #prepend>
        <v-icon icon="$moves" />
      </template>
      <v-divider />
      <v-card-text class="pa-1">
        <SceneMoves
          :moves="moves"
          :scene="scene"
        />
      </v-card-text>
      <v-divider />
      <v-card-actions class="d-flex justify-center">
        <v-btn
          color="primary"
          @click.stop="session.moves=false"
        >
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

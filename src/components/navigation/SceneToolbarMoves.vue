<script lang="ts" setup>
import { useMoves } from '@/composables';
import { useSceneStore } from '@/stores/scene';
const { scene, moves } = storeToRefs(useSceneStore())
const { count, color } = useMoves(moves, scene)
const dialog = ref(false)
</script>

<template>
  <v-btn
    icon
    density="compact"
    size="40"
    variant="elevated"
    :color="color"
    :text="String(count)"
    @click.stop="dialog = true"
  />
  <v-dialog
    v-model="dialog"
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
      <template #append>
        <v-btn
          icon="$close"
          variant="text"
          color="primary"
          @click.stop="dialog=false"
        />
      </template>
      <v-divider />
      <v-card-text class="pa-1">
        <SceneMoves />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

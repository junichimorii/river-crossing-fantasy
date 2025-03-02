<script lang="ts" setup>
import { useSceneStore } from '@/stores/scene';
const { scene, moves } = storeToRefs(useSceneStore())
</script>

<template>
  <v-row no-gutters>
    <v-col
      v-for="(move, i) in moves"
      :key="i"
      cols="12"
      md="6"
      xl="4"
    >
      <v-list-item>
        <v-list-item-title>
          <v-icon :icon="move.origin < move.destination ? '$inbound' : '$outbound'" />
          <v-chip
            v-for="id in move.crews"
            :key="id"
            variant="text"
            class="pa-2"
          >
            <PuzzleCrewAvatar :state="scene.crews[id]" />
            <span class="text-caption">{{ scene.crews[id].name }}</span>
          </v-chip>
        </v-list-item-title>
        <template #prepend>
          <v-chip
            rounded
            color="primary"
          >
            {{ i + 1 }}
          </v-chip>
        </template>
        <template #append>
          <span v-if="scene.landscape?.night">
            + {{ move.value }} min
          </span>
        </template>
      </v-list-item>
    </v-col>
  </v-row>
</template>

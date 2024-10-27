<script lang="ts" setup>
import type { Move, Scene } from '@/types';
defineProps<{
  moves: Set<Move>,
  scene: Scene
}>()
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
            v-for="cast in move.casts"
            :key="cast.id"
            variant="text"
            class="pa-2"
          >
            <v-avatar
              start
              size="small"
            >
              <SceneCastAvatar :cast="cast" />
            </v-avatar>
            <span class="text-caption">{{ cast.name }}</span>
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

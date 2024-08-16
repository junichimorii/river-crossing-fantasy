<script lang="ts" setup>
import sprites from '@/assets/images/casts';
import type { Move } from '@/types';
defineProps<{
  moves: Set<Move>,
  category: number
}>()
</script>

<template>
  <v-card
    flat
    title="履歴"
    class="bg-transparent"
  >
    <template #prepend>
      <v-icon>$moves</v-icon>
    </template>
    <v-row no-gutters>
      <v-col
        v-for="(move, i) in moves"
        :key="i"
        :cols="12"
        :lg="6"
      >
        <v-list-item>
          <v-list-item-title>
            <v-icon
              :icon="move.bound === 'inbound' ? '$inbound' : '$outbound'"
            />
            <v-chip
              v-for="cast in move.casts"
              :key="cast.id"
              variant="text"
              class="pa-2"
            >
              <v-avatar
                start
                size="small"
                style="border-style: none;"
                >
                <v-img
                  :src="sprites[cast.appearance]"
                  :style="{ transform: `scale(${cast.role.rower === false ? 0.85 : 1}, ${cast.role.rower === false ? 0.85 : 1})` }"
                />
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
            <span v-if="category === 7">
              + {{ move.value }} min
            </span>
          </template>
        </v-list-item>
      </v-col>
    </v-row>
  </v-card>
</template>

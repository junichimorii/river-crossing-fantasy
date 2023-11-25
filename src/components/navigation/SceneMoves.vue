<script lang="ts" setup>
import type { Move } from '@/types'
import type { Category } from '@/types/scene'
import sprites from '@/assets/images/casts'
defineProps<{
  moves: Set<Move>,
  category: Category
}>()
</script>

<template>
  <v-row no-gutters>
    <v-col
      :cols="12"
      :lg="6"
      v-for="(move, i) in moves"
      :key="i"
    >
      <v-list-item>
        <v-list-item-title>
          <v-icon
            :icon="move.bound === 'inbound' ? 'mdi-arrow-up' : 'mdi-arrow-down'"
          ></v-icon>
          <v-chip
            v-for="cast in move.casts"
            :key="cast.id"
            variant="text"
            class="pa-2"
          >
            <v-avatar start>
              <v-img
                :src="sprites[cast.appearance.sprite]"
                :style="{ transform: `scale(${cast.appearance.ratio}, ${cast.appearance.ratio})` }"
              ></v-img>
            </v-avatar>
            <span class="text-caption">{{ cast.name }}</span>
          </v-chip>
        </v-list-item-title>
        <template v-slot:prepend>
          <v-chip
            rounded
            color="primary"
          >
            {{ i + 1 }}
          </v-chip>
        </template>
        <template v-slot:append>
          <span v-if="category === 'time-limited'">
            + {{ move.value }} min
          </span>
        </template>
      </v-list-item>
    </v-col>
  </v-row>
</template>
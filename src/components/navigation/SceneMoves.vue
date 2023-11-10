<script lang="ts" setup>
import type { Move } from '@/types'
import type { Category } from '@/types/scene'
defineProps<{
  moves: Set<Move>,
  category: Category
}>()
</script>

<template>
  <v-list>
    <v-list-subheader>
      <v-icon icon="mdi-history"></v-icon>
      履歴
    </v-list-subheader>
    <v-row no-gutters>
      <v-col
        v-for="(move, i) in moves"
        :key="i"
        cols="12"
        sm="6"
        md="4"
      >
        <v-list-item>
          <template v-slot:prepend>
            <v-chip
              rounded
              color="green"
              class="mr-3"
            >
              {{ i + 1 }}
            </v-chip>
          </template>
          <v-list-item-title>
            <v-icon
              v-if="i % 2 === 0"
              icon="mdi-arrow-up"
            ></v-icon>
            <v-icon
              v-if="i % 2 === 1"
              icon="mdi-arrow-down"
            ></v-icon>
            <v-chip
              v-for="cast in move.casts"
              :key="cast.id"
              variant="text"
              size="large"
            >
              <v-avatar start>
                <v-img
                  :src="cast.appearance.sprite"
                  :style="{ transform: `scale(${cast.appearance.ratio}, ${cast.appearance.ratio})` }"
                ></v-img>
              </v-avatar>
              {{ cast.name }}
            </v-chip>
          </v-list-item-title>
          <template v-slot:append>
            <span v-if="category === 'time-limited'">
              + {{ move.value }} min
            </span>
          </template>
        </v-list-item>
      </v-col>
    </v-row>
  </v-list>
</template>
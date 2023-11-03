<script lang="ts" setup>
import { usePuzzleStore } from '@/store/puzzle'
const puzzle = usePuzzleStore()
</script>

<template>
  <v-list class="bg-transparent">
    <v-list-subheader>
      <v-icon icon="mdi-account-multiple"></v-icon>
      登場人物
    </v-list-subheader>
    <v-row no-gutters>
      <v-col
        v-for="cast in puzzle.scene.casts"
        :key="cast.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-list-item
          :title="cast.name"
          class="text-subtitle-2"
        >
          <span v-if="cast.role.canRow !== undefined">
            {{ cast.role.canRow ? '舟を漕げる。' : '舟を漕げない。' }}
          </span>
          <span v-if="cast.role.duration !== undefined">
            橋を渡るのに{{ cast.role.duration }}分必要。
          </span>
          <span v-if="cast.role.weight !== undefined">
            重量は定員{{ cast.role.weight }}人分。
          </span>
          <span>
            {{ cast.description }}
          </span>
          <template v-slot:prepend>
            <v-avatar>
              <v-img
                :src="cast.appearance.sprite"
                :style="{ transform: `scale(${cast.appearance.ratio}, ${cast.appearance.ratio})` }"
              ></v-img>
            </v-avatar>
          </template>
        </v-list-item>
      </v-col>
    </v-row>
  </v-list>
</template>
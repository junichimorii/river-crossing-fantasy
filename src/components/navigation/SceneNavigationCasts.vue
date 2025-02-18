<script lang="ts" setup>
import { useCast } from '@/composables';
import { convert } from '@/composables/use-text';
import { useSceneStore } from '@/stores/scene';
const { getDescription } = useCast()
const { scene } = storeToRefs(useSceneStore())
</script>

<template>
  <v-card
    flat
    prepend-icon="$casts"
    title="登場人物"
  >
    <v-row no-gutters>
      <v-col
        v-for="cast in scene.casts"
        :key="cast.id"
        cols="12"
        md="6"
        xl="4"
      >
        <v-list-item
          :title="cast.name"
          class="text-subtitle-2"
        >
          <!-- eslint-disable vue/no-v-html -->
          <span v-html="convert(getDescription(cast))" />
          <!-- eslint-enable -->
          <template #prepend>
            <v-avatar
              tile
              size="x-large"
            >
              <PuzzleCastAvatar :state="cast" />
            </v-avatar>
          </template>
        </v-list-item>
      </v-col>
    </v-row>
  </v-card>
</template>

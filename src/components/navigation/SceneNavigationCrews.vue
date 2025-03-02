<script lang="ts" setup>
import { useCrew } from '@/composables';
import { convert } from '@/composables/use-text';
import { useSceneStore } from '@/stores/scene';
const { getDescription } = useCrew()
const { scene } = storeToRefs(useSceneStore())
</script>

<template>
  <v-card
    flat
    prepend-icon="$crews"
    title="登場人物"
  >
    <v-row no-gutters>
      <v-col
        v-for="crew in scene.crews"
        :key="crew.id"
        cols="12"
        md="6"
        xl="4"
      >
        <v-list-item
          :title="crew.name"
          class="text-subtitle-2"
        >
          <!-- eslint-disable vue/no-v-html -->
          <span v-html="convert(getDescription(crew))" />
          <!-- eslint-enable -->
          <template #prepend>
            <PuzzleCrewAvatar
              :state="crew"
              size="x-large"
            />
          </template>
        </v-list-item>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts" setup>
import { useLevel } from '@/composables';
import { convert } from '@/composables/use-text';
import { useRecordsStore } from '@/stores/records';
import type { Scene } from '@/types';
const props = defineProps<{
  scene: Scene
  tips?: boolean
}>()
const { scene } = toRefs(props)
const { getScore } = useRecordsStore()
const { level } = useLevel(scene)
</script>

<template>
  <v-list-item
    :id="`s${scene.id}`"
    :to="`/${scene.id}`"
    :title="scene.title"
    lines="one"
    class="elevation-4 rounded mx-1 my-1"
  >
    <v-list-item-subtitle>
      <!-- eslint-disable vue/no-v-html -->
      <div v-html="convert(scene.rules.conditions[0])" />
      <!-- eslint-enable -->
    </v-list-item-subtitle>
    <div>
      <PuzzleCastAvatar
        v-for="cast in scene.casts"
        :key="cast.id"
        :state="cast"
      />
    </div>
    <!-- eslint-disable vue/no-v-html -->
    <div
      v-if="tips"
      class="text-body-2 my-1"
      v-html="scene.rules.tips ? convert(scene.rules.tips[0]) : ''"
    />
    <!-- eslint-enable -->
    <template #append>
      <v-sheet class="d-flex flex-column align-end bg-transparent">
        <v-icon
          :icon="`$${level}`"
          :color="level"
          size="small"
        />
        <ScoreRating
          :value="getScore(scene.id)"
          size="small"
        />
      </v-sheet>
    </template>
  </v-list-item>
</template>

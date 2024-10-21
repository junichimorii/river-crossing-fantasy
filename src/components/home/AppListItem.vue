<script lang="ts" setup>
import casts from '@/assets/images/casts';
import { useCast } from '@/composables';
import { convert } from '@/composables/use-text';
import { useRecordsStore } from '@/stores/records';
import type { Scene } from '@/types';
const { getScore } = useRecordsStore()
const { getTransform } = useCast()
const props = defineProps<{
  scene: Scene
  tips?: boolean
}>()
const { scene } = toRefs(props)
</script>

<template>
  <v-list-item
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
    <div class="d-flex justify-start align-end">
      <v-avatar
        v-for="cast in scene.casts"
        :key="cast.id"
        tile
      >
        <v-img
          :src="casts[cast.appearance]"
          :style="{ transform: getTransform(cast, 0) }"
          style="transform-origin: bottom center;"
        />
      </v-avatar>
    </div>
    <!-- eslint-disable vue/no-v-html -->
    <div
      v-if="tips"
      v-html="scene.rules.tips ? convert(scene.rules.tips[0]) : ''"
      class="text-body-2 my-1"
    />
    <!-- eslint-enable -->
    <template #append>
      <v-sheet class="d-flex flex-column align-end bg-transparent">
        <SceneLevelIcon
          :level="scene.level"
          :passing="scene.passing"
        />
        <SceneScoreRating
          :value="getScore(scene.id)"
          size="small"
        />
      </v-sheet>
    </template>
  </v-list-item>
</template>

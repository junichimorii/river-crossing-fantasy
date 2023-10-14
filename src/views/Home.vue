<script lang="ts" setup>
import { useRecordsStore } from '@/store/records'
const records = useRecordsStore()
/**  ステージのスコアの有無 */
const hasScore = (
  id: number
) => records.state.scenes.has(id) || id === 1
/**  ステージのスコアを取得 */
const getScore = (
  id: number
) => records.state.scenes.get(id) || 0
</script>

<template>
  <v-img
    cover
    src="/images/landscapes/daytime-river.png"
    class="d-flex justify-center align-start fill-height"
  >
    <v-container>
      <h1 class="text-h5 text-sm-h3 text-center py-2">
        River Crossing Puzzles
      </h1>
      <div class="text-subtitle-2 text-center">Made with Vuetify</div>
      <v-list
        class="pa-3 bg-transparent"
      >
        <v-list-item
          v-for="scene in records.scenes"
          :key="scene.id"
          :to="`/${scene.id}`"
          :title="scene.title"
          :disabled="!hasScore(scene.id)"
          class="elevation-4 rounded my-1 bg-white"
        >
          <template v-slot:prepend>
            <v-chip color="green" class="mr-3">
              Q{{scene.id}}
            </v-chip>
          </template>
          <template v-slot:append>
            <v-icon
              v-if="!hasScore(scene.id)"
              icon="mdi-lock"
            ></v-icon>
            <v-rating
              v-if="hasScore(scene.id)"
              readonly
              :length="2"
              :size="32"
              :model-value="getScore(scene.id)"
              active-color="orange"
            />
          </template>
        </v-list-item>
      </v-list>
    </v-container>
  </v-img>
</template>
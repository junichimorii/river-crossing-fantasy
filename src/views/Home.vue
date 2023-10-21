<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRecordsStore } from '@/store/records'
const records = useRecordsStore()
onMounted(async () => {
  if (!records.has(1)) records.set(1, 0)
})
</script>

<template>
  <v-img
    cover
    src="/images/landscapes/daytime-river.png"
    class="d-flex justify-center align-start fill-height"
  >
    <v-container>
      <h1 class="text-h5 text-sm-h3 text-center py-3">
        River Crossing Puzzles
      </h1>
      <div class="text-subtitle-2 text-center py-3">Made with Vuetify</div>
      <v-list-item
        v-for="scene in records.scenes"
        :key="scene.id"
        :to="`/${scene.id}`"
        :title="scene.title"
        :disabled="false/*!records.has(scene.id)*/"
        class="elevation-4 rounded my-1 bg-white"
      >
        <template v-slot:prepend>
          <v-chip
            :color="scene.category === 'time-limited' ? 'indigo' : 'green'"
            class="mr-3"
          >
            Q{{scene.id}}
          </v-chip>
        </template>
        <template v-slot:append>
          <v-icon
            v-if="!records.has(scene.id)"
            icon="mdi-lock"
          ></v-icon>
          <v-rating
            v-if="records.has(scene.id)"
            readonly
            density="compact"
            size="small"
            :length="2"
            :model-value="records.get(scene.id)"
            active-color="orange"
          />
        </template>
      </v-list-item>
    </v-container>
  </v-img>
</template>
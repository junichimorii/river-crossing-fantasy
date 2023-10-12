<script lang="ts" setup>
import { useRecordsStore } from '@/store/records'
const records = useRecordsStore()
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
          class="elevation-4 rounded bg-white my-1"
        >
          <template v-slot:prepend>
            <v-chip color="green" class="mr-3">
              Q{{scene.id}}
            </v-chip>
          </template>
          <template v-slot:append>
            <v-icon icon="mdi-lock"></v-icon>
          </template>
          <v-list-item-subtitle></v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-container>
  </v-img>
</template>
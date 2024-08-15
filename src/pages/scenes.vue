<script lang="ts" setup>
import { useRecordsStore } from '@/stores/records';
const { scenes } = useRecordsStore()
const headers = [
  { key: 'id', title:'id' },
  { key: 'title', title:'title' },
  { key: 'category', title:'category' },
  { key: 'order', title:'order' },
  { key: 'level', title:'level' },
  { key: 'rules.tips', title:'tips' },
]
</script>

<template>
  <v-app-bar
    :elevation="2"
    density="compact"
    color="secondary"
    title="River Crossing Fantasy"
    style="font-family: 'Architects Daughter', cursive;"
  />
  <v-main>
    <v-container>
      <v-data-table
        :items="scenes"
        :headers="headers"
        :items-per-page="-1"
        density="compact"
      >
        <template #[`item.rules.tips`]="{ value }">
          <div
            v-for="text in value"
            :key="text"
          >
            {{ text }}
          </div>
        </template>
      </v-data-table>
    </v-container>
  </v-main>
</template>

<script lang="ts" setup>
import { convert } from '@/composables/use-text';
import { useRecordsStore } from '@/stores/records';
const { scenes } = useRecordsStore()
const headers = [
  { key: 'id', title:'id' },
  { key: 'title', title:'title' },
  { key: 'category', title:'category' },
  { key: 'order', title:'order' },
  { key: 'passing', title:'passing' },
  { key: 'rules.transportation', title:'transportation' },
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
    <v-container fluid>
      <v-data-table
        :items="scenes"
        :headers="headers"
        :items-per-page="-1"
        :sort-by="[{ key: 'category', order: 'asc' }, { key: 'order', order: 'asc' }]"
        density="compact"
      >
        <template #[`item.category`]="{ value }">
          <v-chip
            :color="`category${value}`"
          >
            {{ value }}
          </v-chip>
        </template>
        <template #[`item.rules.transportation`]="{ value }">
          <!-- eslint-disable vue/no-v-html -->
          <div v-html="convert(value)" />
          <!-- eslint-enable -->
        </template>
        <template #[`item.rules.tips`]="{ value }">
          <!-- eslint-disable vue/no-v-html -->
          <div
            v-for="text in value"
            :key="text"
            v-html="convert(text)"
          />
          <!-- eslint-enable -->
        </template>
      </v-data-table>
    </v-container>
  </v-main>
</template>

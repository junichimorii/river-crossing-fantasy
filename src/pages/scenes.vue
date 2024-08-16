<script lang="ts" setup>
import { convert } from '@/composables/use-text';
import { useRecordsStore } from '@/stores/records';
const { scenes } = useRecordsStore()
const headers = [
  { key: 'id', title:'id' },
  { key: 'title', title:'title' },
  { key: 'category', title:'category' },
  { key: 'order', title:'order' },
  { key: 'level', title:'level' },
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
    <v-container>
      <v-data-table
        :items="scenes"
        :headers="headers"
        :items-per-page="-1"
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
          <div v-html="convert(value)" />
        </template>
        <template #[`item.rules.tips`]="{ value }">
          <div
            v-for="text in value"
            :key="text"
            v-html="convert(text)"
          />
        </template>
      </v-data-table>
    </v-container>
  </v-main>
</template>

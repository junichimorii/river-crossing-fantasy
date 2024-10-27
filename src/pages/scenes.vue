<script lang="ts" setup>
import { convert } from '@/composables/use-text';
import { useRecordsStore } from '@/stores/records';
const { scenes } = useRecordsStore()
const headers = [
  { key: 'id', title:'id', width: '5%' },
  { key: 'title', title:'title', width: '10%' },
  { key: 'category', title:'category', width: '5%' },
  { key: 'order', title:'order', width: '5%' },
  { key: 'passing', title:'passing', width: '5%' },
  { key: 'rules.transportation', title:'transportation', width: '20%' },
  { key: 'casts', title:'casts', width: '20%' },
  { key: 'rules.tips', title:'tips', width: '30%' },
]
</script>

<template>
  <v-app-bar
    title="River Crossing Fantasy"
    style="font-family: 'Architects Daughter', cursive;"
    color="secondary"
    prominent
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
        <template #[`item.casts`]="{ value }">
          <v-avatar
            v-for="cast in value"
            :key="cast.id"
            tile
          >
            <SceneCastAvatar :cast="cast" />
          </v-avatar>
        </template>
      </v-data-table>
    </v-container>
  </v-main>
</template>

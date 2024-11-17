<script lang="ts" setup>
import { useRecordsStore } from '@/stores/records';
const { scenes } = useRecordsStore()
const headers = [
  { key: 'id', title:'id', width: '5%' },
  { key: 'title', title:'title', width: '25%' },
  { key: 'category', title:'category', width: '5%' },
  { key: 'order', title:'order', width: '5%' },
  { key: 'casts', title:'casts', width: '60%' },
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
        <template #[`item.casts`]="{ value }">
          <div
            v-for="cast in value"
            :key="cast.id"
          >
            <v-avatar tile>
              <SceneCastAvatar :cast="cast" />
            </v-avatar>
            <span>{{ cast.name }}</span>
            :
            <span>{{ cast.description }}</span>
          </div>
        </template>
      </v-data-table>
    </v-container>
  </v-main>
</template>

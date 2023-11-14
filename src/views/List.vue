<script lang="ts" setup>
import { useRecordsStore } from '@/store/records'
const records = useRecordsStore()
const items = Object.values(records.scenes)
const headers = [
  { title: 'id', value: 'id', sortable: true },
  { title: 'title', value: 'title' },
  { title: 'category', value: 'category', sortable: true },
  { title: 'level', value: 'level' },
  { title: 'passing', value: 'passing' },
  { title: 'casts', value: 'casts' },
]
const sortBy = [
  { key: 'category', order: true },
  { key: 'id', order: true }
]
</script>

<template>
  <v-main>
    <v-container fluid>
      <v-data-table
        :sort-by="sortBy"
        :headers="headers"
        :items="items"
        :items-per-page="50"
      >
        <template v-slot:item.id="{ value }">
          <v-chip>
            Q{{value}}
          </v-chip>
        </template>
        <template v-slot:item.category="{ value }">
          <v-chip :color="value">
            {{ value }}
          </v-chip>
        </template>
        <template v-slot:item.casts="{ value }">
          <v-avatar
            v-for="cast in value"
            :key="cast.id"
          >
            <v-img
              :src="cast.appearance.sprite"
              :style="{ transform: `scale(${cast.appearance.ratio}, ${cast.appearance.ratio})` }"
            ></v-img>
          </v-avatar>
        </template>
      </v-data-table>
    </v-container>
  </v-main>
</template>

<script lang="ts" setup>
import { useRecordsStore } from '@/store/records'
const records = useRecordsStore()
const items = Object.values(records.scenes)
const headers = [
  { title: 'id', value: 'id', width: '5%', sortable: true },
  { title: 'title', value: 'title', width: '12%' },
  { title: 'description', value: 'description', width: '25%' },
  { title: 'category', value: 'category', width: '10%', sortable: true },
  { title: 'level', value: 'level', width: '5%' },
  { title: 'landscape', value: 'landscape', width: '5%' },
  { title: 'passing', value: 'passing', width: '5%' },
  { title: 'carriers', value: 'carriers', width: '5%' },
  { title: 'casts', value: 'casts', width: '35%' },
]
</script>

<template>
  <v-main>
    <v-container fluid>
      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="50"
      >
        <template #[`item.id`]="{ value }">
          <v-chip>
            Q{{value}}
          </v-chip>
        </template>
        <template #[`item.category`]="{ value }">
          <v-chip :color="value">
            {{ value }}
          </v-chip>
        </template>
        <template #[`item.description`]="{ value }">
          <!-- <div class="text-caption">{{ value.conditions }}</div>
          <div class="text-caption">{{ value.transportation }}</div> -->
          <div
            v-for="(tip, i) in value.tips"
            :key="i"
            class="text-caption"
            v-html="tip"
          ></div>
        </template>
        <template #[`item.landscape`]="{ value }">
          <v-icon v-if="value && value.island">mdi-island</v-icon>
          <v-icon v-if="value && value.night">mdi-weather-night</v-icon>
        </template>
        <template #[`item.carriers`]="{ value }">
          <v-chip
            v-for="carrier in value"
            :key="carrier.id"
            variant="text"
          >
            <v-avatar start rounded="0" size="large">
              <v-img
                :src="carrier.appearance.sprite"
              ></v-img>
            </v-avatar>
            <span class="text-caption">{{ carrier.capacity }}</span>
          </v-chip>
        </template>
        <template #[`item.casts`]="{ value }">
          <v-chip
            v-for="cast in value"
            :key="cast.id"
            variant="text"
          >
            <v-avatar start>
              <v-img
                :src="cast.appearance.sprite"
                :style="{ transform: `scale(${cast.appearance.ratio}, ${cast.appearance.ratio})` }"
              ></v-img>
            </v-avatar>
            <span class="text-caption">{{ cast.name }}</span>
          </v-chip>
        </template>
      </v-data-table>
    </v-container>
  </v-main>
</template>

<script lang="ts" setup>
import { useRules } from '@/composables';
import { convert } from '@/composables/use-text';
import { useRecordsStore } from '@/stores/records';
const { scenes } = useRecordsStore()
const { getConditions, getTransportation } = useRules()
const headers = [
  { key: 'id', title:'id', width: '5%' },
  { key: 'title', title:'title', width: '10%' },
  { key: 'category', title:'category', width: '5%' },
  { key: 'order', title:'order', width: '5%' },
  { key: 'passing', title:'passing', width: '5%' },
  { key: 'rules.conditions', title:'conditions', width: '20%' },
  { key: 'rules.transportation', title:'transportation', width: '20%' },
  { key: 'rules.tips', title:'tips', width: '40%' },
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
          <v-chip :color="`category${value}`">
            {{ value }}
          </v-chip>
        </template>
        <template #[`item.carriers`]="{ value }">
          <span
            v-for="carrier in value"
            :key="carrier.id"
          >
            {{ carrier.capacity }}
          </span>
        </template>
        <!-- eslint-disable vue/no-unused-vars -->
        <template #[`item.rules.conditions`]="{ value, item }">
          <!-- eslint-disable vue/no-v-html -->
          <div
            v-for="text in getConditions(item)"
            :key="text"
            v-html="convert(text)"
          />
          <!-- eslint-enable -->
        </template>
        <!-- eslint-enable -->
        <template #[`item.rules.transportation`]="{ value, item }">
          <!-- eslint-disable vue/no-v-html -->
          <div>
            <span v-html="convert(getTransportation(item))" />
            <span
              v-if="value"
              class="font-weight-bold"
              v-html="convert(value)"
            />
          </div>
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

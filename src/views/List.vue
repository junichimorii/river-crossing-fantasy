<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import carriers from '@/assets/images/carriers'
import casts from '@/assets/images/casts'
import { convert } from '@/composables/use-text'
import { useRecordsStore } from '@/store/records'
import { useSettingsStore } from '@/store/settings'
const router = useRouter()
const settings = useSettingsStore()
const records = useRecordsStore()
const items = Object.values(records.scenes)
const headers = [
  { title: 'id', value: 'id', width: '4%', sortable: true },
  { title: 'title', value: 'title', width: '10%' },
  { title: 'level', value: 'level', width: '4%' },
  { title: 'category', value: 'category', width: '6%', sortable: true },
  { title: 'rules', value: 'rules', width: '36%' },
  { title: 'landscape', value: 'landscape', width: '4%' },
  { title: 'passing', value: 'passing', width: '4%' },
  { title: 'carriers', value: 'carriers', width: '4%' },
  { title: 'casts', value: 'casts', width: '30%' },
]
onMounted(async () => {
  if (!settings.state.debug) {
    router.push({ path: '/home' })
  }
})
</script>

<template>
  <v-main>
    <v-container fluid>
      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="50"
        class="text-caption"
      >
        <template #[`item.id`]="{ value }">
          Q{{value}}
        </template>
        <template #[`item.category`]="{ value }">
          <div
            :class="`text-${value}`"
          >
            {{ value }}
          </div>
        </template>
        <template #[`item.rules`]="{ value }">
          <div
            v-for="(tip, i) in value.tips"
            :key="i"
            v-html="convert(tip)"
          ></div>
        </template>
        <template #[`item.landscape`]="{ value }">
          <v-icon v-if="value && value.island">mdi-island</v-icon>
          <v-icon v-if="value && value.night">mdi-weather-night</v-icon>
        </template>
        <template #[`item.carriers`]="{ value }">
          <div class="d-flex">
            <div
              v-for="carrier in value"
              :key="carrier.id"
              class="text-center"
            >
              <div>
                <v-avatar
                  rounded="0"
                >
                  <v-img
                    :src="carriers[carrier.appearance.sprite]"
                  >
                    {{ carrier.capacity }}
                  </v-img>
                </v-avatar>
              </div>
            </div>
          </div>
        </template>
        <template #[`item.casts`]="{ value }">
          <div class="d-flex">
            <div
              v-for="cast in value"
              :key="cast.id"
              class="text-center"
            >
              <v-avatar
                rounded="0"
                class="d-block"
              >
                <v-img
                  :src="casts[cast.appearance.sprite]"
                  :style="{ transform: `scale(${cast.appearance.ratio}, ${cast.appearance.ratio})` }"
                >
                </v-img>
              </v-avatar>
              <div
                style="font-size: 0.6rem;"
                class="px-1"
              >
                {{ cast.name }}
              </div>
            </div>
          </div>
        </template>
      </v-data-table>
    </v-container>
  </v-main>
</template>

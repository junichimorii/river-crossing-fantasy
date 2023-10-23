<script lang="ts" setup>
import { onMounted } from 'vue'
import { useSettingsStore } from '@/store/settings'
import { useRecordsStore } from '@/store/records'
import { AppSplash } from '@/components'
const settings = useSettingsStore()
const records = useRecordsStore()
onMounted(async () => {
  if (!records.has(1)) records.set(1, 0)
})
</script>

<template>
  <v-img
    cover
    src="/images/landscapes/daytime-river.png"
    class="d-flex justify-center align-start fill-height"
  >
    <v-container>
      <h1 class="text-h5 text-sm-h3 text-center py-4">
        River Crossing Puzzles
      </h1>
      <v-list-item
        v-for="scene in records.scenes"
        :key="scene.id"
        lines="one"
        :to="`/${scene.id}`"
        :title="scene.title"
        :subtitle="scene.description.conditions"
        :disabled="false/*!records.has(scene.id)*/"
        class="elevation-4 rounded my-1"
        style="background-color: hsla(0, 0%, 100%, 0.95)"
      >
        <template v-slot:prepend>
          <v-chip
            :color="scene.category"
            class="mr-3"
          >
            Q{{scene.id}}
          </v-chip>
        </template>
        <template v-slot:append>
          <v-icon
            v-if="!records.has(scene.id)"
            icon="mdi-lock"
          ></v-icon>
          <v-rating
            v-if="records.has(scene.id)"
            readonly
            density="compact"
            size="small"
            :length="2"
            :model-value="records.get(scene.id)"
            active-color="orange"
          />
        </template>
      </v-list-item>
    </v-container>
  </v-img>
  <v-footer
    app
    class="pa-0"
  >
    <v-banner
      lines="one"
      text="River Crossing Puzzles"
      color="primary"
      class="px-3 py-0"
    >
      <template v-slot:actions>
        <v-btn
          @click="settings.state.splash = true"
        >
          このゲームについて
        </v-btn>
      </template>
    </v-banner>
  </v-footer>
  <AppSplash></AppSplash>
</template>
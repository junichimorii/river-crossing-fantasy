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
  <v-app-bar
    :elevation="2"
    density="compact"
    color="secondary"
    title="River Crossing Puzzles"
    style="font-family: 'Architects Daughter', cursive;"
  ></v-app-bar>
  <v-main>
    <v-parallax
      src="/images/landscapes/daytime-river.png"
      class="h-100"
    >
      <v-container>
        <template
          v-for="scene in records.scenes"
          :key="scene.id"
        >
          <v-list-subheader
            v-if="scene.level"
          >
            <v-icon
              icon="mdi-speedometer"
            ></v-icon>
            {{ scene.level }}
          </v-list-subheader>
          <v-list-item
            lines="one"
            :to="`/scene/${scene.id}`"
            :title="scene.title"
            :subtitle="scene.description.conditions"
            :disabled="false/*!records.has(scene.id)*/"
            class="elevation-4 rounded my-1"
            style="background-color: hsla(0, 0%, 100%, 0.95)"
          >
            <template v-slot:prepend>
              <v-chip
                rounded
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
                active-color="tertiary"
              />
            </template>
          </v-list-item>
        </template>
      </v-container>
    </v-parallax>
  </v-main>
  <v-footer
    app
    class="pa-0"
  >
    <v-banner
      lines="one"
      text="River Crossing Puzzles"
      color="primary"
      class="px-3 py-0"
      style="font-family: 'Architects Daughter', cursive;"
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

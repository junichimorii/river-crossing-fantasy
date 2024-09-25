<script lang="ts" setup>
import casts from '@/assets/images/casts';
import sprites from '@/assets/images/landscapes';
import { useCast } from '@/composables';
import { convert } from '@/composables/use-text';
import categories from '@/stores/category';
import { useRecordsStore } from '@/stores/records';
import { useSessionStore } from '@/stores/session';
const { scenes } = storeToRefs(useRecordsStore())
const { getScore } = useRecordsStore()
const { state: session } = storeToRefs(useSessionStore())
const { getTransform } = useCast()
const items = computed(() => categories.map(category => Object.assign(category, {
  scenes: scenes.value.filter(scene => scene.category === category.id).sort((a, b) => a.order - b.order)
})))
</script>

<template>
  <v-main>
    <v-parallax
      :src="sprites.daytimeRiver"
      class="h-100"
    >
      <v-toolbar
        class="bg-transparent"
        title="River Crossing Fantasy"
        style="font-family: 'Architects Daughter', cursive;"
      >
        <template #append>
          <v-btn
            icon="$introduction"
            @click.stop="session.introduction = true"
          />
          <v-btn
            icon="$settings"
            @click.stop="session.settings = true"
          />
        </template>
      </v-toolbar>
      <v-container>
        <v-row>
          <v-col
            v-for="category in items"
            :key="category.id"
            cols="12"
            sm="6"
            xl="4"
          >
            <v-card class="opacity-90">
              <v-card-title
                :class="`bg-category${category.id}`"
                class="elevation-4"
              >
                {{ category.name }}
              </v-card-title>
              <v-card-subtitle class="py-1">
                {{ category.description }}
              </v-card-subtitle>
              <v-list-item
                v-for="scene in category.scenes"
                :id="`s${scene.id}`"
                :key="scene.id"
                :to="`/${scene.id}`"
                :title="scene.title"
                lines="one"
                class="elevation-4 rounded mx-1 my-1"
              >
                <v-list-item-subtitle>
                  <!-- eslint-disable vue/no-v-html -->
                  <div v-html="convert(scene.rules.conditions[0])" />
                  <!-- eslint-enable -->
                </v-list-item-subtitle>
                <v-list-item-subtitle class="d-flex justify-start align-end">
                  <v-avatar
                    v-for="cast in scene.casts"
                    :key="cast.id"
                    tile
                    size="small"
                    style="border-style: none;"
                  >
                    <v-img
                      :src="casts[cast.appearance]"
                      :style="{ transform: getTransform(cast, 0) }"
                      style="transform-origin: bottom center;"
                    />
                  </v-avatar>
                </v-list-item-subtitle>
                <template #append>
                  <v-rating
                    readonly
                    density="compact"
                    size="small"
                    :length="2"
                    :model-value="getScore(scene.id)"
                    active-color="orange"
                  />
                </template>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-footer class="text-center d-flex flex-column bg-transparent">
        <div style="font-family: 'Architects Daughter', cursive;">
          River Crossing Fantasy - Made with Vuetify.
        </div>
      </v-footer>
    </v-parallax>
  </v-main>
  <AppIntroduction />
  <AppSettings />
</template>

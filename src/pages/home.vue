<script lang="ts" setup>
import sprites from '@/assets/images/landscapes';
import categories from '@/stores/category';
import { useRecordsStore } from '@/stores/records';
const { scenes } = storeToRefs(useRecordsStore())
const items = computed(() => categories.map(category => Object.assign(category, {
  scenes: scenes.value.filter(scene => scene.category === category.id).sort((a, b) => a.order - b.order)
})))
</script>

<template>
  <v-main>
    <v-parallax
      :src="sprites.river"
      class="h-100"
    >
      <AppToolbar />
      <v-container>
        <v-row>
          <v-col
            v-for="category in items"
            :key="category.id"
            cols="12"
            sm="6"
            xl="4"
          >
            <AppCategoryCard :category="category" />
          </v-col>
        </v-row>
      </v-container>
      <AppFooter />
    </v-parallax>
  </v-main>
  <AppIntroduction />
  <AppSettings />
</template>

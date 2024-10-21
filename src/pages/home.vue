<script lang="ts" setup>
import casts from '@/assets/images/casts';
import landscapes from '@/assets/images/landscapes';
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
      :src="landscapes.river"
      class="h-100"
    >
      <v-container>
        <h1
          class="text-h4 text-center mb-6"
          style="font-family: 'Architects Daughter', cursive;"
        >
          River Crossing Fantasy
        </h1>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            xl="4"
          >
            <v-list-item
              to="/introduce"
              title="このゲームについて"
              subtitle="このゲームの紹介です。"
              :prepend-avatar="casts.villager1"
              lines="two"
              class="bg-white elevation-4 rounded opacity-90"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
            xl="4"
          >
            <v-list-item
              to="/recommend"
              title="おすすめパズル"
              subtitle="特におすすめしたい川渡りパズルを紹介しています。"
              :prepend-avatar="casts.wizard1"
              lines="two"
              class="bg-white elevation-4 rounded opacity-90"
            />
          </v-col>
        </v-row>
        <v-divider class="my-4" />
        <h2 class="d-flex justify-space-between text-h6 mb-4">
          <div>
            パズル一覧
          </div>
          <AppScore />
        </h2>
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
      <v-divider class="my-4" />
      <AppFooter />
    </v-parallax>
  </v-main>
</template>

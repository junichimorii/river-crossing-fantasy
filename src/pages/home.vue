<script lang="ts" setup>
import crews from '@/assets/images/crews';
import landscapes from '@/assets/images/landscapes';
import categories from '@/stores/category';
import { useRecordsStore } from '@/stores/records';
const goTo = useGoTo()
const { scenes, latest } = storeToRefs(useRecordsStore())
const items = computed(() => categories.map(category => Object.assign(category, {
  scenes: scenes.value.filter(scene => scene.category === category.id).sort((a, b) => a.order - b.order)
})))
onMounted(async () => {
  goTo(`#s${latest.value}`)
})
</script>

<template>
  <v-main>
    <v-parallax
      :src="landscapes.river"
      class="h-100"
    >
      <v-container>
        <h1 class="text-h4 text-center mb-6 decorated-header">
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
              :prepend-avatar="crews.villager1"
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
              :prepend-avatar="crews.wizard1"
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
          <RecordsScore />
        </h2>
        <v-row>
          <v-col
            v-for="category in items"
            :key="category.id"
            cols="12"
            sm="6"
            xl="4"
          >
            <HomeListContainer :category="category" />
          </v-col>
        </v-row>
      </v-container>
      <v-divider class="my-4" />
      <AppFooter />
    </v-parallax>
    <v-fab
      app
      icon="$collapse"
      @click="goTo(0)"
    />
  </v-main>
</template>

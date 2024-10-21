<script lang="ts" setup>
import sprites from '@/assets/images/landscapes';
import { bt03, ec03, mm02, pg09, tp01, tu01 } from '@/stores/scenes';
const scenes = [ tu01, pg09, ec03, mm02, bt03, tp01 ]
</script>

<template>
  <v-main>
    <v-parallax
      :src="sprites.river"
      class="h-100"
    >
      <v-container>
        <h1 class="text-h6 text-center mb-6">
          おすすめパズル
        </h1>
        <p>
          特におすすめしたい川渡りパズルを紹介しています。
        </p>
        <v-divider class="my-4" />
        <v-row>
          <v-col
            v-for="scene in scenes"
            :key="scene.id"
            cols="12"
            sm="6"
            xl="4"
          >
            <AppListItem
              tips
              :scene="scene"
              class="bg-white elevation-4 rounded opacity-90"
            />
          </v-col>
        </v-row>
        <v-divider class="my-4" />
        <div class="d-flex justify-center">
          <v-btn
            color="success"
            variant="elevated"
            size="x-large"
            to="/home"
          >
            ホーム画面に戻る
          </v-btn>
        </div>
      </v-container>
      <v-divider />
      <AppFooter />
    </v-parallax>
  </v-main>
</template>

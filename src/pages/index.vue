<script lang="ts" setup>
import sprites from '@/assets/images/landscapes';
import { useAppearance } from '@/composables';
const { stageSize } = useAppearance()
</script>

<template>
  <v-main>
    <div class="d-flex align-center justify-center fill-height bg-secondary">
      <v-img
        cover
        :src="sprites.river"
        :height="stageSize"
      >
        <v-img
          src="@/assets/images/title.webp"
          :height="stageSize"
        >
          <div class="d-flex align-center justify-center fill-height">
            <v-btn
              color="success"
              variant="elevated"
              size="x-large"
              to="/home"
            >
              Start
            </v-btn>
          </div>
          <template #placeholder>
            <div class="d-flex align-end justify-end fill-height text-h4">
              River Crossing Fantasy
            </div>
          </template>
        </v-img>
      </v-img>
    </div>
  </v-main>
</template>

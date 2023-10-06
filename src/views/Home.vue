<script lang="ts" setup>
import { useSettingStore } from '@/store/setting'
const setting = useSettingStore()
</script>

<template>
  <v-img
    cover
    src="/images/landscapes/daytime-river.png"
    class="d-flex justify-center align-start fill-height"
  >
    <v-container>
      <h1 class="text-h6 text-sm-h4 text-center py-2">
        River Crossing Puzzles
      </h1>
      <div class="text-subtitle-2 text-center">Made with Vuetify</div>
      <v-card
        v-for="scene in setting.scenes"
        :key="scene.id"
        class="my-3"
      >
        <v-list-item
          :to="`/stage/${scene.id}`"
          :disabled="scene.id < setting.state.scene"
        >
          <template v-slot:prepend>
            <v-chip color="green">
              Q{{scene.id}}
            </v-chip>
          </template>
          <v-list-item-title class="pl-3">{{ scene.title }}</v-list-item-title>
          <v-list-item-subtitle></v-list-item-subtitle>
        </v-list-item>
      </v-card>
    </v-container>
  </v-img>
</template>
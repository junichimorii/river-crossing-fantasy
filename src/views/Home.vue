<script lang="ts" setup>
import { useSettingStore } from '@/store/setting'
const setting = useSettingStore()
</script>

<template>
  <v-img
    cover
    src="/images/landscapes/daytime-river.png"
  >
    <v-container>
      <h1 class="text-h6 text-sm-h4 text-center py-2">
        River Crossing Puzzles
      </h1>
      <v-card
        v-for="scene in setting.scenes"
        :key="scene.id"
        class="my-1"
      >
        <v-list-item
          :to="`/stage/${scene.id}`"
          :disabled="scene.id < setting.state.scene"
        >
          <template v-slot:prepend>
            <v-chip>
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
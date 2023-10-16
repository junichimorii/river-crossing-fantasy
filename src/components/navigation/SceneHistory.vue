<script lang="ts" setup>
import { useSceneStore } from '@/store/scene'
const scene = useSceneStore()
</script>

<template>
  <v-card
    flat
    prepend-icon="mdi-history"
    class="overflow-y-auto bg-transparent"
    title="履歴"
  >
    <template v-slot:append>
      <v-badge
        :color="scene.isExceeded?'error':'success'"
        :content="scene.count"
        inline
      ></v-badge>
    </template>
    <v-divider></v-divider>
    <v-card-item>
      <v-list>
        <v-list-item
          v-for="(history, i) in scene.history"
          :key="i"
        >
          <template v-slot:prepend>
            <v-chip color="green" class="mr-3">
              {{ i + 1 }}
            </v-chip>
          </template>
          <v-list-item-title>
            <v-icon
              v-if="i % 2 === 0"
              icon="mdi-arrow-up"
            ></v-icon>
            <v-icon
              v-if="i % 2 === 1"
              icon="mdi-arrow-down"
            ></v-icon>
            <v-avatar
              v-for="cast in history.casts"
            >
              <v-img :src="cast.avatar"></v-img>
            </v-avatar>
          </v-list-item-title>
          <template v-slot:append>
            <span v-if="scene.state.category === 'bridgeAndTorch'">
              + {{ history.duration }} min
            </span>
          </template>
        </v-list-item>
      </v-list>
    </v-card-item>
  </v-card>
</template>
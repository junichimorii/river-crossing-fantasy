<script lang="ts" setup>
import { useSceneStore } from '@/store/scene'
const scene = useSceneStore()
</script>

<template>
  <v-card flat class="overflow-y-auto bg-transparent">
    <v-card-title>
      <v-chip color="green">
        Q{{scene.state.id}}
      </v-chip>
      {{ scene.state.title }}
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-card-item>
        <v-card-subtitle>
          クリア条件:
        </v-card-subtitle>
        <v-card-text class="py-1">
          {{ scene.state.description.conditions }}
        </v-card-text>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>
          移動手段:
        </v-card-subtitle>
        <v-card-text class="py-1">
          {{ scene.state.description.transportation }}
        </v-card-text>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>
          登場人物:
        </v-card-subtitle>
        <v-list-item
          v-for="cast in scene.state.casts"
          :key="cast.id"
        >
          <v-list-item-title class="text-subtitle-2">
            <v-avatar>
              <v-img :src="cast.avatar"></v-img>
            </v-avatar>
            {{ cast.description }}
          </v-list-item-title>
        </v-list-item>
      </v-card-item>
    </v-card-text>
  </v-card>
</template>
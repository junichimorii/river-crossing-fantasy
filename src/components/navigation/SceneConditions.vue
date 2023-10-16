<script lang="ts" setup>
import { useSceneStore } from '@/store/scene'
const scene = useSceneStore()
</script>

<template>
  <v-card flat class="overflow-y-auto bg-transparent">
    <v-card-title>
      <v-chip
        size="x-large"
        color="green"
      >
        Q{{scene.state.id}}
      </v-chip>
      {{ scene.state.title }}
    </v-card-title>
    <v-divider></v-divider>
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
          {{ cast.name }}
        </v-list-item-title>
        <v-list-item-subtitle class="text-subtitle-2">
          {{
            cast.role.duration
              ? `橋を渡るのに${cast.role.duration}分必要。`
              : cast.role.canRow
                ? '舟を漕げる。'
                : '舟を漕げない。'
          }}
          {{ cast.description }}
        </v-list-item-subtitle>
        <template v-slot:prepend>
          <v-avatar>
            <v-img :src="cast.avatar"></v-img>
          </v-avatar>
        </template>
      </v-list-item>
    </v-card-item>
  </v-card>
</template>
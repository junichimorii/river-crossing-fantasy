<script lang="ts" setup>
import { useSceneStore } from '@/store/scene'
const scene = useSceneStore()
</script>

<template>
  <v-card
    flat
    class="overflow-y-auto"
  >
    <v-card-title>
      <v-chip
        size="x-large"
        :color="scene.state.category"
      >
        Q{{scene.state.id}}
      </v-chip>
      {{ scene.state.title }}
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text
      class="overflow-y-auto pa-0"
    >
      <v-card-item>
        <v-card-subtitle>
          <v-icon icon="mdi-lock-open"></v-icon>
          クリア条件:
        </v-card-subtitle>
        <v-card-text class="py-1">
          {{ scene.state.description.conditions }}
        </v-card-text>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>
          <v-icon icon="mdi-swap-vertical"></v-icon>
          移動手段:
        </v-card-subtitle>
        <v-card-text class="py-1">
          {{ scene.state.description.transportation }}
        </v-card-text>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>
          <v-icon icon="mdi-account-multiple"></v-icon>
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
            <span v-if="cast.role.canRow !== undefined">
              {{ cast.role.canRow ? '舟を漕げる。' : '舟を漕げない。' }}
            </span>
            <span v-if="cast.role.duration !== undefined">
              橋を渡るのに{{ cast.role.duration }}分必要。
            </span>
            <span v-if="cast.role.weight !== undefined">
              重量は定員{{ cast.role.weight }}人分。
            </span>
            <span>
              {{ cast.description }}
            </span>
          </v-list-item-subtitle>
          <template v-slot:prepend>
            <v-avatar>
              <v-img :src="cast.avatar" :style="{ transform: `scale(${cast.ratio}, ${cast.ratio})` }"></v-img>
            </v-avatar>
          </template>
        </v-list-item>
      </v-card-item>
      <v-card-item v-if="scene.state.tips">
        <v-card-subtitle>
          <v-icon icon="mdi-chat-alert"></v-icon>
          Tips:
        </v-card-subtitle>
        <v-card-text
          v-for="(tips, i) in scene.state.tips"
          :key="i"
          class="py-1"
        >
          {{ tips }}
        </v-card-text>
      </v-card-item>
    </v-card-text>
    <v-divider></v-divider>
    <slot name="actions"></slot>
  </v-card>
</template>
<script lang="ts" setup>
import { toKebabCase } from '@/composables/use-text';
import type { Category, Scene } from '@/types';
const props = defineProps<{
  category: Category & {
    scenes: Scene[];
  }
}>()
const { category } = toRefs(props)
</script>

<template>
  <v-card
    :id="`#${toKebabCase(category.name)}`"
    class="opacity-90"
  >
    <v-card-title
      :class="`bg-category${category.id}`"
      class="decorated-header"
    >
      {{ category.name }}
    </v-card-title>
    <v-card-text class="py-1">
      {{ category.description }}
    </v-card-text>
    <HomeListItem
      v-for="scene in category.scenes"
      :key="scene.id"
      :scene="scene"
    />
  </v-card>
</template>

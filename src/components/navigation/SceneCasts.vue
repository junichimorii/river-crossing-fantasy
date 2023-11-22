<script lang="ts" setup>
import type { Cast } from '@/types'
import sprites from '@/assets/images/casts'
import { convert } from '@/composables/use-text'
defineProps<{
  casts: Cast[]
}>()
</script>

<template>
  <v-list
    class="bg-transparent"
  >
    <v-list-item
      v-for="cast in casts"
      :key="cast.id"
      :title="cast.name"
      class="text-subtitle-2"
    >
      <span
        v-if="cast.role.rower !== undefined"
        v-html="convert(cast.role.rower ? '筏（いかだ）を漕（こ）げる。' : '筏（いかだ）を漕（こ）げない。')"
      ></span>
      <span v-if="cast.role.duration !== undefined">
        橋を渡るのに{{ cast.role.duration }}分必要。
      </span>
      <span v-if="cast.role.weight !== undefined">
        重量は定員{{ cast.role.weight }}人分。
      </span>
      <span>
        {{ cast.description }}
      </span>
      <template v-slot:prepend>
        <v-avatar>
          <v-img
            :src="sprites[cast.appearance.sprite]"
            :style="{ transform: `scale(${cast.appearance.ratio}, ${cast.appearance.ratio})` }"
          ></v-img>
        </v-avatar>
      </template>
    </v-list-item>
  </v-list>
</template>
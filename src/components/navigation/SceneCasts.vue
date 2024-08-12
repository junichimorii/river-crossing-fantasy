<script lang="ts" setup>
import sprites from '@/assets/images/casts';
import { useCast } from '@/composables';
import { convert } from '@/composables/use-text';
import type { Cast } from '@/types';
const { getTransform } = useCast()
defineProps<{
  casts: Cast[]
}>()
</script>

<template>
  <v-card
    flat
    title="登場人物"
    class="bg-transparent"
  >
    <template #prepend>
      <v-icon>$casts</v-icon>
    </template>
    <v-row no-gutters>
      <v-col
        v-for="cast in casts"
        :key="cast.id"
        :cols="12"
        :lg="6"
      >
        <v-list-item
          :title="cast.name"
          class="text-subtitle-2"
        >
          <!-- eslint-disable vue/no-v-html -->
          <span
            v-if="cast.role.rower !== undefined"
            v-html="convert(`筏（いかだ）を漕（こ）げ${cast.role.rower ? 'る' : 'ない'}。`)"
          />
          <!-- eslint-enable -->
          <span
            v-if="cast.role.duration !== undefined"
            v-text="`橋を渡るのに${cast.role.duration}分必要。`"
          />
          <span
            v-if="cast.role.weight !== undefined"
            v-text="`重量は定員${cast.role.weight}人分。`"
          />
          <span
            v-if="cast.role.repairer"
            v-html="convert('筏（いかだ）を修理できる。')"
          />
          <!-- eslint-disable vue/no-v-html -->
          <span
            v-if="cast.description"
            v-html="convert(cast.description)"
          />
          <!-- eslint-enable -->
          <template #prepend>
            <v-avatar
              rounded="0"
              size="x-large"
            >
              <v-img
                :src="sprites[cast.appearance]"
                :style="{ transform: getTransform(cast, -1) }"
              />
            </v-avatar>
          </template>
        </v-list-item>
      </v-col>
    </v-row>
  </v-card>
</template>

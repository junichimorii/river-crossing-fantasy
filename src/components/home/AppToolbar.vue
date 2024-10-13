<script lang="ts" setup>
import { useSessionStore } from '@/stores/session';
const { state: session } = storeToRefs(useSessionStore())
</script>

<template>
  <v-toolbar
    class="bg-transparent"
    title="River Crossing Fantasy"
    style="font-family: 'Architects Daughter', cursive;"
  >
    <template #append>
      <AppScore />
      <v-btn
        icon="$introduction"
        @click.stop="session.introduction = true"
      />
      <v-btn
        icon="$settings"
        @click.stop="session.settings = true"
      />
    </template>
  </v-toolbar>
</template>

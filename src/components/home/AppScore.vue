<script lang="ts" setup>
import { useRecordsStore } from '@/stores/records';
const { state: records, scenes } = storeToRefs(useRecordsStore())
</script>

<template>
  <v-chip
    variant="text"
    prepend-icon="$ratingFull"
  >
    {{ records.scenes.size }} / {{ scenes.length }}
  </v-chip>
</template>

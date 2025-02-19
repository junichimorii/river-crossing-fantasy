<script lang="ts" setup>
import { useRecordsStore } from '@/stores/records';
const { state: records, scenes } = storeToRefs(useRecordsStore())
</script>

<template>
  <v-chip
    rounded
    variant="elevated"
    color="primary"
    prepend-icon="$scoreFull"
    class="decorated-header"
  >
    {{ records.scenes.size }} / {{ scenes.length }}
  </v-chip>
</template>

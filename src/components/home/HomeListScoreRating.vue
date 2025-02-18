<script lang="ts" setup>
defineProps<{
  value: number
  size: number | string
}>()
</script>

<template>
  <v-rating
    readonly
    :model-value="value"
    :size="size"
    :length="2"
    density="compact"
    empty-icon="$scoreEmpty"
    full-icon="$scoreFull"
    color="grey"
    active-color="orange"
  />
</template>

<script lang="ts" setup>
const props = defineProps<{
  level: number | undefined
  passing: number
}>()
const { level, passing } = toRefs(props)
const n = computed(() =>
  level.value !== undefined
    ? level.value
    : passing.value >= 21
      ? 5
      : passing.value >= 17
        ? 4
        : passing.value >= 11
          ? 3
          : passing.value >= 5
            ? 2
            : 1
)
</script>

<template>
  <v-icon
    :icon="`$level${n}`"
    :color="`level${n}`"
    size="small"
  />
</template>

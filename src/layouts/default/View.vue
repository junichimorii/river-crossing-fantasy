<script lang="ts" setup>
  //
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Suspense timeout="0">
      <component :is="Component"></component>
      <template #fallback>Loading...</template>
    </Suspense>
  </RouterView>
</template>
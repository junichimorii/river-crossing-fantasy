<script lang="ts" setup>
  //
</script>

<template>
  <v-main>
    <RouterView v-slot="{ Component }">
      <Suspense timeout="0">
        <component :is="Component"></component>
        <template #fallback>Loading...</template>
      </Suspense>
    </RouterView>
  </v-main>
</template>
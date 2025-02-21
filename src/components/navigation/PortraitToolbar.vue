<script lang="ts" setup>
const { isSupported, orientation } = useScreenOrientation()
</script>

<template>
  <v-app-bar
    v-if="isSupported && orientation === 'portrait-primary'"
    app
    title="River Crossing Fantasy"
    class="decorated-header"
  />
</template>

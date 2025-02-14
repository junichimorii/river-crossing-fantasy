<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script lang="ts" setup>
//
const settings = useStorage('RIVER_CROSSING_SETTINGS', null)
settings.value = null
const level = useStorage('RIVER_CROSSING_LEVEL', null)
level.value = null
</script>

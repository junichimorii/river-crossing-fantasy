<script lang="ts" setup>
import { useSessionStore } from '@/stores/session';
const { isSupported, orientation } = useScreenOrientation()
const { state: session } = storeToRefs(useSessionStore())
</script>

<template>
  <v-app-bar-nav-icon
    v-if="isSupported && orientation === 'landscape-primary'"
    variant="elevated"
    size="small"
    color="primary"
    @click.stop="session.navigation = !session.navigation"
  />
</template>

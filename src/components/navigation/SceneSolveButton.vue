<script lang="ts" setup>
import { useSessionStore } from '@/stores/session';
import { useSettingsStore } from '@/stores/settings';
const { state: settings } = storeToRefs(useSettingsStore())
const { state: session } = storeToRefs(useSessionStore())
</script>

<template>
  <v-btn
    v-if="settings.debug"
    icon="$solve"
    variant="elevated"
    size="small"
    color="primary"
    @click.stop="session.solve = true"
  />
</template>

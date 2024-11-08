<script lang="ts" setup>
import { useSceneStore } from '@/stores/scene';
import { useSessionStore } from '@/stores/session';
const { state: session } = storeToRefs(useSessionStore())
const { init } = useSceneStore()
</script>

<template>
  <v-btn
    icon="$restart"
    variant="elevated"
    size="small"
    color="primary"
    @click.stop="init();session.navigation=false"
  />
</template>

<script lang="ts" setup>
import { useMoves } from '@/composables';
import { useSceneStore } from '@/stores/scene';
import { useSessionStore } from '@/stores/session';
import { useSettingsStore } from '@/stores/settings';
const { state: session } = storeToRefs(useSessionStore())
const { scene, moves } = storeToRefs(useSceneStore())
const { count, color } = useMoves(moves, scene)
</script>

<template>
  <v-btn
    icon
    density="compact"
    size="40"
    variant="elevated"
    :color="color"
    :text="String(count)"
    @click.stop="session.moves = true"
  />
</template>

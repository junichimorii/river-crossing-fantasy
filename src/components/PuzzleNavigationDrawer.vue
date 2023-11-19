<script lang="ts" setup>
import { SceneNavigation } from '@/components'
import { useSessionStore } from '@/store/session'
const session = useSessionStore()
</script>

<template>
  <v-navigation-drawer
    v-model="session.state.drawer"
    temporary
    location="right"
  >
    <SceneNavigation></SceneNavigation>
  </v-navigation-drawer>
</template>
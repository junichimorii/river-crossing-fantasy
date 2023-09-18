<script lang="ts" setup>
import { Ref, computed } from 'vue'
import usePuzzle from '@/composables/use-puzzle'
import { usePuzzleStore } from '@/store/puzzle'
import HelloWorld from '@/components/HelloWorld.vue'
const puzzle = usePuzzle()
</script>

<template>
  <HelloWorld />
</template>


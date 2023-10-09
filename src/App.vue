<script lang="ts" setup>
import { useEventListener } from '@vueuse/core'
/** スワイプ時のエラーを無効化 */
useEventListener(document, 'touchstart', (event) => {
  if(event.cancelable) event.preventDefault()
})
</script>

<template>
  <router-view />
</template>

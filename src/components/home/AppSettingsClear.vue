<script lang="ts" setup>
import { useRecordsStore } from '@/stores/records';
const { isEmpty } = storeToRefs(useRecordsStore())
const { clear } = useRecordsStore()
</script>

<template>
  <v-list-item>
    <v-btn
      block
      color="warning"
      size="large"
      prepend-icon="$clear"
      :disabled="isEmpty"
      @click.stop="clear()"
    >
      記録を消去する
    </v-btn>
  </v-list-item>
</template>

<script lang="ts" setup>
const { isSupported, orientation } = useScreenOrientation()
const init = inject<() => void>('init', () => {})
</script>

<template>
  <v-footer
    v-if="isSupported && orientation === 'portrait-primary'"
    app
    class="justify-center"
  >
    <v-btn
      variant="elevated"
      color="success"
      prepend-icon="$prev"
      to="/home"
    >
      パズル一覧に戻る
    </v-btn>
    <v-btn
      variant="elevated"
      color="warning"
      prepend-icon="$restart"
      @click.stop="init()"
    >
      最初から始める
    </v-btn>
  </v-footer>
</template>

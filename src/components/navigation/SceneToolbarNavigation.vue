<script lang="ts" setup>
const { isSupported, orientation } = useScreenOrientation()
const init = inject<() => void>('init', () => {})
const dialog = ref(false)
</script>

<template>
  <v-app-bar-nav-icon
    v-if="isSupported && orientation === 'landscape-primary'"
    variant="elevated"
    size="small"
    color="primary"
    @click.stop="dialog = !dialog"
  />
  <v-dialog
    v-model="dialog"
    scrollable
    :retain-focus="false"
    class="d-flex justify-center align-center"
  >
    <SceneNavigation class="opacity-90">
      <template #append>
        <v-btn
          icon="$close"
          variant="text"
          @click.stop="dialog=false"
        />
      </template>
      <template #bottom-action>
        <v-card-actions class="justify-center">
          <v-btn
            variant="elevated"
            color="success"
            prepend-icon="$home"
            to="/home"
          >
            パズル一覧に戻る
          </v-btn>
          <v-btn
            variant="elevated"
            color="warning"
            prepend-icon="$restart"
            @click.stop="init();dialog=false"
          >
            最初から始める
          </v-btn>
        </v-card-actions>
      </template>
    </SceneNavigation>
  </v-dialog>
</template>

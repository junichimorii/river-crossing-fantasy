<script lang="ts" setup>
import casts from '@/assets/images/casts'
import { useCast } from '@/composables'
import { convert } from '@/composables/use-text'
import { useRecordsStore } from '@/stores/records'
import { useSessionStore } from '@/stores/session'
const goTo = useGoTo()
const session = useSessionStore()
const records = useRecordsStore()
const { getTransform } = useCast()
onMounted(async () => {
  const nextSceneId = records.getNextSceneId()
  goTo(`#s${nextSceneId}`, {
    easing: 'easeInOutCubic',
    offset: -100
  })
})
</script>

<template>
  <v-app-bar
    :elevation="2"
    density="compact"
    color="secondary"
    title="River Crossing Fantasy"
    style="font-family: 'Architects Daughter', cursive;"
  />
  <v-main>
    <v-parallax
      src="@/assets/images/title.png"
      class="h-100"
    >
      <v-container>
        <template
          v-for="scene in records.scenes"
          :key="scene.id"
        >
          <v-list-subheader
            v-if="records.header(scene.id)"
          >
            <v-icon
              icon="$level"
            />
            {{ records.header(scene.id) }}
          </v-list-subheader>
          <v-list-item
            :id="`s${scene.id}`"
            lines="one"
            :to="`/${scene.id}`"
            :title="scene.title"
            class="elevation-4 rounded my-1"
            style="background-color: hsla(0, 0%, 100%, 0.95)"
          >
            <v-list-item-subtitle>
              <!-- eslint-disable vue/no-v-html -->
              <div v-html="convert(scene.rules.conditions[0])" />
              <!-- eslint-enable -->
            </v-list-item-subtitle>
            <v-list-item-subtitle
              class="d-flex justify-end align-end"
            >
              <v-avatar
                v-for="cast in scene.casts"
                :key="cast.id"
                size="24"
              >
                <v-img
                  :src="casts[cast.appearance]"
                  :style="{ transform: getTransform(cast, 1) }"
                  style="transform-origin: bottom center;"
                />
              </v-avatar>
            </v-list-item-subtitle>
            <template #prepend>
              <v-chip
                rounded
                :color="scene.category"
                class="mr-3"
              >
                Q{{ scene.id }}
              </v-chip>
            </template>
            <template #append>
              <v-rating
                readonly
                density="compact"
                size="small"
                :length="2"
                :model-value="records.getScore(scene.id)"
                active-color="orange"
              />
            </template>
          </v-list-item>
        </template>
      </v-container>
    </v-parallax>
  </v-main>
  <v-footer
    app
    class="pa-0"
  >
    <v-banner
      lines="one"
      text="River Crossing Fantasy"
      color="primary"
      class="px-3 py-0"
      style="font-family: 'Architects Daughter', cursive;"
    >
      <template #actions>
        <v-btn
          @click.stop="session.state.introduction = true"
        >
          このゲームについて
        </v-btn>
        <v-btn
          @click.stop="session.state.settings = true"
        >
          設定
        </v-btn>
      </template>
    </v-banner>
  </v-footer>
  <AppIntroduction />
  <AppSettings />
</template>

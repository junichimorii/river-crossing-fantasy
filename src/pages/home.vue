<script lang="ts" setup>
import casts from '@/assets/images/casts'
import { useCast } from '@/composables'
import { convert } from '@/composables/use-text'
import categories from '@/stores/category'
import { useRecordsStore } from '@/stores/records'
import { useSessionStore } from '@/stores/session'
const { getTransform } = useCast()
const goTo = useGoTo()
const session = useSessionStore()
const records = useRecordsStore()
const items = computed(() => categories.map(category => Object.assign(category, {
  scenes: records.scenes.filter(scene => scene.category === category.id).sort((a, b) => a.order - b.order)
})))
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
        <v-row>
          <v-col
            v-for="category in items"
            :key="category.id"
            cols="12"
            md="6"
            xl="4"
          >
            <v-card class="opacity-90">
              <v-card-title
                :class="`bg-category${category.id}`"
                class="elevation-4"
              >
                {{ category.name }}
              </v-card-title>
              <v-card-subtitle class="py-1">
                {{ category.description }}
              </v-card-subtitle>
              <v-list-item
                v-for="scene in category.scenes"
                :id="`s${scene.id}`"
                :key="scene.id"
                :to="`/${scene.id}`"
                :title="scene.title"
                lines="one"
                class="elevation-4 rounded mx-1 my-1"
              >
                <v-list-item-subtitle>
                  <!-- eslint-disable vue/no-v-html -->
                  <div v-html="convert(scene.rules.conditions[0])" />
                  <!-- eslint-enable -->
                </v-list-item-subtitle>
                <v-list-item-subtitle
                  class="d-flex justify-start align-end"
                >
                  <v-avatar
                    v-for="cast in scene.casts"
                    :key="cast.id"
                    size="28"
                  >
                    <v-img
                      :src="casts[cast.appearance]"
                      :style="{ transform: getTransform(cast, 0) }"
                      style="transform-origin: bottom center;"
                    />
                  </v-avatar>
                </v-list-item-subtitle>
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
            </v-card>
          </v-col>
        </v-row>
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

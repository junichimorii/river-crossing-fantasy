<script lang="ts" setup>
import { useRecordsStore } from '@/store/records'
const records = useRecordsStore()
</script>

<template>
  <v-app-bar
    :elevation="2"
    density="compact"
    color="secondary"
    title="River Crossing Puzzles"
    style="font-family: 'Architects Daughter', cursive;"
  ></v-app-bar>
  <v-main>
    <v-container fluid>
      <v-table>
        <thead>
          <tr>
            <th class="text-center">
              #
            </th>
            <th class="text-center">
              タイトル/条件/移動手段/ヒント
            </th>
            <th class="text-center">
              カテゴリ
            </th>
            <th class="text-center">
              登場人物
            </th>
            <th class="text-center">
              制限回数/時間
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="scene in records.scenes"
            :key="scene.id"
          >
            <td>
              <v-chip
                rounded
                :color="scene.category"
              >
                Q{{scene.id}}
              </v-chip>
            </td>
            <td>
              <div>{{ scene.title }}</div>
              <div>
                <small>
                  {{ scene.description.conditions }}<br>
                  <!-- {{ scene.description.transportation }}<br>
                  {{ scene.tips ? scene.description.tips[0] : '' }} -->
                </small>
              </div>
            </td>
            <td>
              <v-chip
                :color="scene.category"
              >
                {{ scene.category }}
              </v-chip>
            </td>
            <td>
              <v-avatar
                v-for="cast in scene.casts"
                :key="cast.id"
              >
                <v-img
                  :src="cast.appearance.sprite"
                  :style="{ transform: `scale(${cast.appearance.ratio}, ${cast.appearance.ratio})` }"
                ></v-img>
              </v-avatar>
            </td>
            <td class="text-right">
              {{ scene.passing }}
              <span v-if="scene.category === 'time-limited'">分</span>
              <span v-else>回</span>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-container>
  </v-main>
</template>

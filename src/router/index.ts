// Composables
import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Default from '@/layouts/default.vue'
import Home from '@/pages/home.vue'
import List from '@/pages/list.vue'
import Scene from '@/pages/scene.vue'
import Scenes from '@/pages/scenes.vue'

const routes: Array<RouteRecordRaw> = [{
  path: '/',
  redirect: '/home',
  component: Default,
  children: [{
    path: '/home',
    component: Home,
  }, {
    path: '/scenes',
    component: Scenes,
  }, {
    path: '/:id(\\d+)',
    component: Scene,
  }, {
    path: '/list',
    component: List,
  }]
}]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router

// Composables
import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router';
import Default from '@/layouts/default/Default.vue'
import Home from '@/views/Home.vue'
import List from '@/views/List.vue'
import Scene from '@/views/Scene.vue'
import Scenes from '@/views/Scenes.vue'

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

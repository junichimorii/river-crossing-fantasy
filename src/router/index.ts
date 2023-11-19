// Composables
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Default from '@/layouts/default/Default.vue'
import Home from '@/views/Home.vue'
import Scene from '@/views/Scene.vue'

const routes: Array<RouteRecordRaw> = [{
  path: '/',
  redirect: '/home',
  component: Default,
  children: [{
    path: '/home',
    component: Home,
  }, {
    path: '/:id(\\d+)',
    component: Scene,
  }]
}]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router

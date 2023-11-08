// Composables
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Default from '@/layouts/default/Default.vue'
import Home from '@/views/Home.vue'
import Scene from '@/views/Scene.vue'
import Search from '@/views/Search.vue'

const routes: Array<RouteRecordRaw> = [{
  path: '/',
  redirect: '/home',
  component: Default,
  children: [{
    path: 'home',
    component: Home,
  }, {
    path: 'scene',
    redirect: '/home',
  }, {
    path: 'scene/:id',
    component: Scene,
  }, {
    path: 'search',
    redirect: '/home',
  }, {
    path: 'search/:id',
    component: Search,
  }]
}]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router

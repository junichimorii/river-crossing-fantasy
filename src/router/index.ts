// Composables
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Default from '@/layouts/default/Default.vue'
import Home from '@/views/Home.vue'
import Scene from '@/views/Scene.vue'
import Test from '@/views/Test.vue'

const routes: Array<RouteRecordRaw> = [{
  path: '/',
  redirect: '/home',
  component: Default,
  children: [{
    path: 'home',
    component: Home,
  }, {
    path: ':id',
    component: Scene,
  }, {
    path: 'test/:id',
    component: Test,
  }]
}]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router

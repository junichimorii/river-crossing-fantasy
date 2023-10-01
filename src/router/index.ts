import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Default from '@/layouts/default/Default.vue'
import Home from '@/views/Home.vue'
import Stage from '@/views/Stage.vue'
const routes: Array<RouteRecordRaw> = [{
  path: '/',
  redirect: '/home',
  component: Default,
  children: [{
    path: 'home',
    component: Home,
  }, {
    path: '/stage/:id',
    props: true,
    component: Stage,
  }]
}]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default router

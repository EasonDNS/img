import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    name: 'Home',
    path: '/one',
    component: () => import('../views/Home.vue')
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

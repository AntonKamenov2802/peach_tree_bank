import HomeView from '@/views/HomeView.vue'
import LogInView from '@/views/LogInView.vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {path: '/', component: HomeView},
  {path: '/login', component: LogInView}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

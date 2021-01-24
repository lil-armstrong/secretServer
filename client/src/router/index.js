import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/index.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: Home
  },
  {
    path: '/view/:hash',
    name: 'View',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/view.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

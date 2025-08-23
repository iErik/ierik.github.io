import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: () => import('@pages/Homepage.vue')
    },
    {
      path: '/portfolio',
      name: 'Portfolio',
      component: () => import('@pages/Portfolio.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@pages/About.vue')
    }
  ]
})

export default router

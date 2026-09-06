import { createRouter, createWebHistory } from 'vue-router'

// Every path renders the same single-scroll page - the
// route only decides which section we land on, see
// Landing.vue
const Landing = () => import('@pages/Landing.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Landing
    },
    {
      path: '/portfolio',
      name: 'Portfolio',
      component: Landing
    },
    {
      path: '/about',
      name: 'About',
      component: Landing
    },
    {
      path: '/experience',
      name: 'Experience',
      component: Landing
    }
  ]
})

export default router

import SessionsMain from '@/components/SessionsMain.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/sessions',
      name: 'home',
      component: SessionsMain,
    },
    {
      path: '/feedback',
      name: 'feedback',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/FeedbackMain.vue'),
    },
  ],
})

export default router

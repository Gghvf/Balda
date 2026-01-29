import { createRouter, createWebHistory,} from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/HomePage.vue')
  },
  {
    path: '/Topic',
    name: 'Topic',
    component: () => import('../pages/TopicPage.vue')
  },
  {
    path: '/Game',
    name: 'Game',
    component: () => import('../pages/GamePage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
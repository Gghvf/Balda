import { createRouter, createWebHistory,} from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/HomePage.vue')
  },
  {
    path: '/topic',
    name: 'Topic',
    component: () => import('../pages/TopicPage.vue')
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import('../pages/GamePage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
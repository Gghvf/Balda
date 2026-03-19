import { createRouter, createWebHistory,} from 'vue-router';

const routes = [
  {
    path: '/',
<<<<<<< HEAD
    name: 'home',
=======
    name: 'Home',
>>>>>>> 3fc9a9b (Restore project files after lock fix)
    component: () => import('../pages/HomePage.vue')
  },
  {
    path: '/topic',
<<<<<<< HEAD
    name: 'topic',
=======
    name: 'Topic',
>>>>>>> 3fc9a9b (Restore project files after lock fix)
    component: () => import('../pages/TopicPage.vue')
  },
  {
    path: '/game',
<<<<<<< HEAD
    name: 'game',
=======
    name: 'Game',
>>>>>>> 3fc9a9b (Restore project files after lock fix)
    component: () => import('../pages/GamePage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
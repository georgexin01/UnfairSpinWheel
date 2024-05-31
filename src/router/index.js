import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'product-list',
      component: () => import('@/views/product-list.vue')
    }
  ]
})

export default router

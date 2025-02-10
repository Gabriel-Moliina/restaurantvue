import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/pages/Login/LoginView.vue'
import LoginCreateView from '@/pages/Login/LoginCreateView.vue'
import LoginBaseView from '@/pages/Login/LoginBaseView.vue'
import HomeView from '@/components/HomeView.vue'
import RestaurantView from '@/components/RestaurantView.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: LoginBaseView,
    children: [
      {
        path: 'create',
        component: LoginCreateView
      },
      {
        path: '',
        component: LoginView
      }
    ]
  },
  {
    path: '/home',
    component: HomeView,
    children: [
      {
        path: 'restaurant/:id',
        component: RestaurantView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

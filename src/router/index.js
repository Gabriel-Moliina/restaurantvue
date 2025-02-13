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
        name: 'loginCreate',
        component: LoginCreateView
      },
      {
        path: '',
        name: 'login',
        component: LoginView
      }
    ]
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: 'restaurant/:id',
        name: 'restaurant',
        component: RestaurantView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from) => {
  const isAuthenticated = localStorage.getItem('token');
  const areaAnnonymous = ['login', 'loginCreate']
  if (!isAuthenticated && !areaAnnonymous.some(x => x == to.name)) 
    return { name: 'login' }
})

export default router

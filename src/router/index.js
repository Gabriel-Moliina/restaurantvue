import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/pages/login/LoginPage.vue'
import RestaurantPage from '@/pages/restaurant/RestaurantPage.vue'
import LoginForm from '@/components/login/LoginForm.vue'
import LoginCreateForm from '@/components/login/LoginCreateForm.vue'

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login', component: LoginPage,
    children: 
    [
      { path: 'create', name: 'loginCreate', component: LoginCreateForm },
      { path: '', name: 'login', component: LoginForm }
    ]
  },
  {
    path: '/restaurant/:id?', name: 'restaurant', component: RestaurantPage
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

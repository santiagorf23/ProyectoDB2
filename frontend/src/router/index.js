import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/components/auth/LoginForm.vue'
import Register from '@/components/auth/RegisterForm.vue'
//import Movies from '@/views/Movies.vue'
//import Cartelera from '@/views/Cartelera.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
  // {
  //   path: '/movies',
  //   name: 'Movies',
  //   component: Movies
  // }
  // {
  //   path: '/cartelera',
  //   name: 'Cartelera',
  //   component: Cartelera
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

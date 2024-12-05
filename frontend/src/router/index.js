import { createRouter, createWebHistory } from 'vue-router'

// Importaciones de vistas principales
import Home from '@/views/Home.vue'
import Movies from '@/views/Movies.vue'
import MovieDetail from '@/views/MovieDetail.vue' // Cambiamos a usar la vista en lugar del componente
import NotFound from '@/views/NotFound.vue' // Importamos NotFound

// Importaciones de componentes de autenticación
import Login from '@/components/auth/LoginForm.vue'
import Register from '@/components/auth/RegisterForm.vue'

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
  },
  {
    path: '/movies',
    name: 'Movies',
    component: Movies
  },
  {
    path: '/movies/:id',
    name: 'MovieDetail',
    component: MovieDetail, // Usamos la vista MovieDetail
    props: true // Permite pasar params como props
  },
  {
    path: '/booking/:movieId',
    name: 'Booking',
    component: () => import('@/views/Booking.vue')
  },
  // Ruta para manejar 404
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound // Ya no usamos importación dinámica
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guardia de navegación para rutas protegidas
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = localStorage.getItem('token') // O tu método de verificación de autenticación

  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router

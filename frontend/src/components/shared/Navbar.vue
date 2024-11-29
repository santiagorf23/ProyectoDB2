<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <!-- Logo/Brand -->
      <router-link class="navbar-brand" to="/">
        <i class="fas fa-film me-2"></i>
        CinemaApp
      </router-link>

      <!-- Botón hamburguesa para móviles -->
      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Contenido del navbar -->
      <div class="collapse navbar-collapse" id="navbarContent">
        <!-- Enlaces de navegación -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/movies">
              Películas
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cartelera">
              Cartelera
            </router-link>
          </li>
        </ul>

        <!-- Botones de autenticación -->
        <ul class="navbar-nav">
          <template v-if="isAuthenticated">
            <li class="nav-item dropdown">
              <a 
                class="nav-link dropdown-toggle" 
                href="#" 
                id="userDropdown" 
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ user?.name || 'Usuario' }}
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li>
                  <router-link class="dropdown-item" to="/profile">
                    Mi Perfil
                  </router-link>
                </li>
                <li>
                  <router-link class="dropdown-item" to="/my-bookings">
                    Mis Reservas
                  </router-link>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <a class="dropdown-item" href="#" @click.prevent="handleLogout">
                    Cerrar Sesión
                  </a>
                </li>
              </ul>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link class="nav-link" to="/login">
                Iniciar Sesión
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/register">
                Registrarse
              </router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth'

const router = useRouter()
const authStore = useAuthStore()

const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

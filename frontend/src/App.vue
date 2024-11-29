<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <router-link class="navbar-brand" to="/">CinemaApp</router-link>
        <button 
          class="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/movies">Películas</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/cartelera">Cartelera</router-link>
            </li>
          </ul>
          <ul class="navbar-nav">
            <template v-if="isAuthenticated">
              <li class="nav-item">
                <router-link class="nav-link" to="/profile">Mi Perfil</router-link>
              </li>
              <li class="nav-item">
                <a @click="logout" class="nav-link" href="#">Cerrar Sesión</a>
              </li>
            </template>
            <template v-else>
              <li class="nav-item">
                <router-link class="nav-link" to="/login">Iniciar Sesión</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/register">Registrarse</router-link>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/store/modules/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const isAuthenticated = computed(() => authStore.isAuthenticated)

const logout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
}
</style>
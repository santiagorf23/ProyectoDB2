<template>
  <nav class="bg-gray-800 text-white">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="text-xl font-bold">CinemaApp</router-link>
          <div class="ml-10 space-x-4">
            <router-link to="/movies" class="hover:text-gray-300">Películas</router-link>
            <router-link to="/cartelera" class="hover:text-gray-300">Cartelera</router-link>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <template v-if="isAuthenticated">
            <router-link to="/profile" class="hover:text-gray-300">
              {{ user.name }}
            </router-link>
            <button @click="logout" class="hover:text-gray-300">Cerrar Sesión</button>
          </template>
          <template v-else>
            <router-link to="/login" class="hover:text-gray-300">Iniciar Sesión</router-link>
            <router-link to="/register" class="hover:text-gray-300">Registrarse</router-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/store/modules/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);

const logout = async () => {
  await authStore.logout();
  router.push('/login');
};
</script>

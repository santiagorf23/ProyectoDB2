<template>
    <footer class="footer bg-dark py-3">
      <div class="container">
        <div class="row align-items-center">
          <!-- Logo y descripción -->
          <div class="col-12 col-md-4 text-center text-md-start mb-3 mb-md-0">
            <h5 class="text-white">CinemaApp</h5>
            <small class="text-white-50">Tu destino cinematográfico</small>
          </div>
  
          <!-- Enlaces rápidos -->
          <div class="col-12 col-md-4 text-center mb-3 mb-md-0">
            <div class="d-flex justify-content-center gap-3">
              <router-link to="/" class="text-white text-decoration-none">
                Inicio
              </router-link>
              <router-link to="/movies" class="text-white text-decoration-none">
                Películas
              </router-link>
              <router-link to="/cartelera" class="text-white text-decoration-none">
                Cartelera
              </router-link>
            </div>
          </div>
  
          <!-- Redes sociales -->
          <div class="col-12 col-md-4 text-center text-md-end">
            <div class="social-links">
              <a href="#" class="text-white mx-2">
                <i class="fab fa-facebook"></i>
              </a>
              <a href="#" class="text-white mx-2">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="text-white mx-2">
                <i class="fab fa-instagram"></i>
              </a>
            </div>
            <small class="text-white-50 d-block mt-2">
              © {{ currentYear }} CinemaApp
            </small>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const currentYear = computed(() => new Date().getFullYear())
  </script>
  
  <style scoped>
  .footer {
    position: relative;
    bottom: 0;
    width: 100%;
  }
  
  .social-links a {
    text-decoration: none;
    transition: opacity 0.3s ease;
  }
  
  .social-links a:hover {
    opacity: 0.8;
  }
  
  /* Efecto hover para los enlaces */
  a:hover {
    opacity: 0.8;
  }
  </style>
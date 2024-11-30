<template>
    <div class="container py-5 text-center">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h1 class="display-1 mb-4">404</h1>
          <h2 class="mb-4">Página no encontrada</h2>
          <p class="lead mb-4">Lo sentimos, la página que buscas no existe.</p>
          <router-link to="/" class="btn btn-primary btn-lg">
            <i class="fas fa-home me-2"></i>
            Volver al inicio
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // No se necesita lógica adicional
  </script>
  
  <style scoped>
  .display-1 {
    font-size: 6rem;
    font-weight: bold;
    color: #dc3545;
  }
  </style>
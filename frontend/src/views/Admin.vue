<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Sidebar -->
      <nav class="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse">
        <div class="position-sticky pt-3">
          <ul class="nav flex-column">
            <li class="nav-item">
              <a 
                class="nav-link text-white" 
                href="#"
                :class="{ active: currentTab === 'dashboard' }"
                @click.prevent="currentTab = 'dashboard'"
              >
                <i class="fas fa-home me-2"></i>
                Dashboard
              </a>
            </li>
            <li class="nav-item">
              <a 
                class="nav-link text-white" 
                href="#"
                :class="{ active: currentTab === 'movies' }"
                @click.prevent="currentTab = 'movies'"
              >
                <i class="fas fa-film me-2"></i>
                Películas
              </a>
            </li>
            <li class="nav-item">
              <a 
                class="nav-link text-white" 
                href="#"
                :class="{ active: currentTab === 'screenings' }"
                @click.prevent="currentTab = 'screenings'"
              >
                <i class="fas fa-calendar me-2"></i>
                Funciones
              </a>
            </li>
            <li class="nav-item">
              <a 
                class="nav-link text-white" 
                href="#"
                :class="{ active: currentTab === 'users' }"
                @click.prevent="currentTab = 'users'"
              >
                <i class="fas fa-users me-2"></i>
                Usuarios
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Contenido principal -->
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
        <!-- Dashboard -->
        <div v-if="currentTab === 'dashboard'">
          <h2 class="mb-4">Dashboard</h2>
          <div class="row">
            <div class="col-md-3 mb-4">
              <div class="card bg-primary text-white">
                <div class="card-body">
                  <h5 class="card-title">Ventas Totales</h5>
                  <h2 class="mb-0">$10,500</h2>
                </div>
              </div>
            </div>
            <div class="col-md-3 mb-4">
              <div class="card bg-success text-white">
                <div class="card-body">
                  <h5 class="card-title">Reservas Hoy</h5>
                  <h2 class="mb-0">25</h2>
                </div>
              </div>
            </div>
            <div class="col-md-3 mb-4">
              <div class="card bg-info text-white">
                <div class="card-body">
                  <h5 class="card-title">Películas Activas</h5>
                  <h2 class="mb-0">12</h2>
                </div>
              </div>
            </div>
            <div class="col-md-3 mb-4">
              <div class="card bg-warning text-white">
                <div class="card-body">
                  <h5 class="card-title">Usuarios Nuevos</h5>
                  <h2 class="mb-0">8</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Gestión de Películas -->
        <div v-if="currentTab === 'movies'">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>Gestión de Películas</h2>
            <button class="btn btn-primary">
              <i class="fas fa-plus me-2"></i>
              Nueva Película
            </button>
          </div>
          <div class="card">
            <div class="card-body">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Título</th>
                      <th>Género</th>
                      <th>Duración</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="movie in movies" :key="movie._id">
                      <td>{{ movie.title }}</td>
                      <td>{{ movie.genre }}</td>
                      <td>{{ movie.duration }} min</td>
                      <td>
                        <span class="badge bg-success">Activa</span>
                      </td>
                      <td>
                        <button class="btn btn-sm btn-primary me-2">
                          <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger">
                          <i class="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Otros tabs... -->
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentTab = ref('dashboard')
const movies = ref([
  // Datos de ejemplo
  {
    _id: 1,
    title: 'Película 1',
    genre: 'Acción',
    duration: 120
  },
  // ... más películas
])
</script>

<style scoped>
.sidebar {
  min-height: calc(100vh - 56px);
}

.nav-link {
  color: rgba(255,255,255,.5);
}

.nav-link:hover,
.nav-link.active {
  color: white;
  background: rgba(255,255,255,.1);
}
</style>

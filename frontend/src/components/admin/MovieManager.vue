<template>
    <div class="container-fluid py-4">
      <div class="row mb-4">
        <div class="col-12">
          <div class="card shadow">
            <div class="card-header">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0">Gestión de Películas</h3>
                </div>
                <div class="col text-end">
                  <button class="btn btn-primary" @click="openAddModal">
                    <i class="bi bi-plus-circle"></i> Agregar Película
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body">
              <!-- Barra de búsqueda -->
              <div class="row mb-3">
                <div class="col-md-6">
                  <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Buscar película..."
                    v-model="searchQuery"
                  >
                </div>
              </div>
  
              <!-- Tabla de películas -->
              <div class="table-responsive">
                <table class="table align-items-center table-flush">
                  <thead class="thead-light">
                    <tr>
                      <th scope="col">Título</th>
                      <th scope="col">Género</th>
                      <th scope="col">Año</th>
                      <th scope="col">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="movie in movies" :key="movie.id">
                      <td>{{ movie.title }}</td>
                      <td>{{ movie.genre }}</td>
                      <td>{{ movie.year }}</td>
                      <td>
                        <button class="btn btn-sm btn-info me-2">
                          <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-danger">
                          <i class="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MovieManager',
    data() {
      return {
        movies: [],
        searchQuery: ''
      }
    },
    methods: {
      openAddModal() {
        // Lógica para abrir modal
      }
    }
  }
  </script>
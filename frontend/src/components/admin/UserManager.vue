<template>
    <div class="container-fluid py-4">
      <div class="row mb-4">
        <div class="col-12">
          <div class="card shadow">
            <div class="card-header">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0">Gestión de Usuarios</h3>
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
                    placeholder="Buscar usuario..."
                    v-model="searchQuery"
                  >
                </div>
              </div>
  
              <!-- Tabla de usuarios -->
              <div class="table-responsive">
                <table class="table align-items-center table-flush">
                  <thead class="thead-light">
                    <tr>
                      <th scope="col">Nombre</th>
                      <th scope="col">Email</th>
                      <th scope="col">Rol</th>
                      <th scope="col">Estado</th>
                      <th scope="col">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in users" :key="user.id">
                      <td>{{ user.name }}</td>
                      <td>{{ user.email }}</td>
                      <td>{{ user.role }}</td>
                      <td>
                        <span :class="user.active ? 'badge bg-success' : 'badge bg-danger'">
                          {{ user.active ? 'Activo' : 'Inactivo' }}
                        </span>
                      </td>
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
    name: 'UserManager',
    data() {
      return {
        users: [],
        searchQuery: ''
      }
    }
  }
  </script>
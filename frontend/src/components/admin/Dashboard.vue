<template>
    <div class="container-fluid">
      <div class="row">
        <!-- Sidebar -->
        <div class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
          <div class="position-sticky pt-3">
            <ul class="nav flex-column">
              <li class="nav-item">
                <router-link to="/admin" class="nav-link active">
                  <i class="bi bi-house-door"></i> Dashboard
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/admin/movies" class="nav-link">
                  <i class="bi bi-film"></i> Películas
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/admin/users" class="nav-link">
                  <i class="bi bi-people"></i> Usuarios
                </router-link>
              </li>
            </ul>
          </div>
        </div>
  
        <!-- Contenido principal -->
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Panel de Administración</h1>
          </div>
          
          <!-- Cards de resumen -->
          <div class="row">
            <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        Total Películas</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">0</div>
                    </div>
                    <div class="col-auto">
                      <i class="bi bi-film fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                        Total Usuarios</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">0</div>
                    </div>
                    <div class="col-auto">
                      <i class="bi bi-people fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Dashboard',
    data() {
      return {
        // Datos del dashboard
      }
    }
  }
  </script>
  
  <style scoped>
  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    padding: 48px 0 0;
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
  }
  
  .card {
    transition: transform .2s;
  }
  
  .card:hover {
    transform: scale(1.03);
  }
  
  .border-left-primary {
    border-left: .25rem solid #4e73df!important;
  }
  
  .border-left-success {
    border-left: .25rem solid #1cc88a!important;
  }
  </style>
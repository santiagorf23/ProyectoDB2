<template>
    <div class="container py-5">
      <div v-if="loading" class="text-center">
        <LoadingSpinner message="Cargando detalles..." />
      </div>
  
      <div v-else-if="error" class="alert alert-danger" role="alert">
        {{ error }}
      </div>
  
      <div v-else class="row">
        <!-- Poster de la película -->
        <div class="col-md-4 mb-4">
          <img 
            :src="movie.posterUrl" 
            :alt="movie.title"
            class="img-fluid rounded shadow"
          >
          <div class="mt-3 d-grid gap-2">
            <router-link 
              :to="{ name: 'Booking', params: { id: movie._id }}"
              class="btn btn-primary btn-lg"
            >
              Reservar Entradas
            </router-link>
            <a 
              :href="movie.trailerUrl" 
              target="_blank"
              class="btn btn-outline-primary"
            >
              Ver Trailer
            </a>
          </div>
        </div>
  
        <!-- Detalles de la película -->
        <div class="col-md-8">
          <h1 class="mb-3">{{ movie.title }}</h1>
          
          <div class="mb-4">
            <span class="badge bg-primary me-2">{{ movie.genre }}</span>
            <span class="badge bg-secondary me-2">{{ movie.duration }} min</span>
            <span class="badge bg-info">{{ movie.rating }}</span>
          </div>
  
          <h5 class="mb-3">Sinopsis</h5>
          <p class="lead mb-4">{{ movie.overview }}</p>
  
          <div class="row mb-4">
            <div class="col-md-6">
              <h5>Director</h5>
              <p>{{ movie.director }}</p>
            </div>
            <div class="col-md-6">
              <h5>Reparto Principal</h5>
              <p>{{ movie.cast.join(', ') }}</p>
            </div>
          </div>
  
          <!-- Horarios disponibles -->
          <div class="card">
            <div class="card-body">
              <h5 class="card-title mb-4">Horarios Disponibles</h5>
              <div class="row g-3">
                <div v-for="screening in movie.screenings" 
                     :key="screening._id"
                     class="col-md-4"
                >
                  <div class="card h-100">
                    <div class="card-body">
                      <h6 class="card-subtitle mb-2 text-muted">
                        {{ formatDate(screening.datetime) }}
                      </h6>
                      <p class="card-text mb-2">
                        Sala {{ screening.room }}
                      </p>
                      <p class="card-text">
                        <small class="text-muted">
                          Asientos disponibles: {{ screening.availableSeats }}
                        </small>
                      </p>
                      <router-link 
                        :to="{ 
                          name: 'Booking', 
                          params: { 
                            id: movie._id,
                            screeningId: screening._id 
                          }
                        }"
                        class="btn btn-sm btn-outline-primary"
                      >
                        Seleccionar
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useMovieStore } from '@/store/modules/movies'
  import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'
  
  const route = useRoute()
  const movieStore = useMovieStore()
  const movie = ref(null)
  const loading = ref(true)
  const error = ref(null)
  
  const formatDate = (date) => {
    return new Date(date).toLocaleString()
  }
  
  onMounted(async () => {
    try {
      loading.value = true
      movie.value = await movieStore.fetchMovieById(route.params.id)
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  })
  </script>
  
  <style scoped>
  .badge {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
  }
  </style>
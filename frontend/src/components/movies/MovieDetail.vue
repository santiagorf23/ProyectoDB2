<template>
    <div class="container py-5">
      <!-- Loading state -->
      <div v-if="loading" class="text-center py-5">
        <LoadingSpinner message="Cargando detalles..." />
      </div>
  
      <!-- Error state -->
      <div v-else-if="error" class="alert alert-danger" role="alert">
        <i class="fas fa-exclamation-circle me-2"></i>
        {{ error }}
      </div>
  
      <!-- Movie details -->
      <div v-else class="row">
        <!-- Poster y acciones -->
        <div class="col-md-4 mb-4">
          <img 
            :src="posterUrl" 
            :alt="movie.title"
            class="img-fluid rounded shadow-sm mb-4"
          >
          <div class="d-grid gap-3">
            <button 
              @click="navigateToBooking" 
              class="btn btn-primary btn-lg"
            >
              <i class="fas fa-ticket-alt me-2"></i>
              Reservar Entradas
            </button>
            <a 
              v-if="movie.trailerUrl"
              :href="movie.trailerUrl"
              target="_blank"
              class="btn btn-outline-primary"
            >
              <i class="fab fa-youtube me-2"></i>
              Ver Trailer
            </a>
          </div>
        </div>
  
        <!-- Información -->
        <div class="col-md-8">
          <h1 class="mb-3">{{ movie.title }}</h1>
          
          <!-- Badges -->
          <div class="mb-4">
            <span class="badge bg-primary me-2">{{ movie.genre }}</span>
            <span class="badge bg-secondary me-2">{{ movie.duration }} min</span>
            <span class="badge bg-info">{{ movie.rating }}</span>
          </div>
  
          <!-- Sinopsis -->
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">Sinopsis</h5>
              <p class="card-text">{{ movie.overview }}</p>
            </div>
          </div>
  
          <!-- Detalles adicionales -->
          <div class="row mb-4">
            <div class="col-md-6">
              <h5>Director</h5>
              <p>{{ movie.director }}</p>
              
              <h5>Año</h5>
              <p>{{ movie.year }}</p>
            </div>
            <div class="col-md-6">
              <h5>Reparto</h5>
              <p>{{ movie.cast?.join(', ') }}</p>
              
              <h5>Idioma</h5>
              <p>{{ movie.language }}</p>
            </div>
          </div>
  
          <!-- Horarios -->
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
                      <button 
                        @click="selectScreening(screening._id)"
                        class="btn btn-sm btn-outline-primary"
                      >
                        Seleccionar
                      </button>
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
  import { ref, computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useMovieStore } from '@/store/modules/movies'
  import LoadingSpinner from '../shared/LoadingSpinner.vue'
  
  const route = useRoute()
  const router = useRouter()
  const movieStore = useMovieStore()
  
  const movie = ref(null)
  const loading = ref(true)
  const error = ref(null)
  
  const posterUrl = computed(() => {
    return movie.value?.posterPath 
      ? `https://image.tmdb.org/t/p/w500${movie.value.posterPath}`
      : '/placeholder-movie.jpg'
  })
  
  const formatDate = (date) => {
    return new Date(date).toLocaleString()
  }
  
  const navigateToBooking = () => {
    router.push(`/booking/${movie.value._id}`)
  }
  
  const selectScreening = (screeningId) => {
    router.push({
      name: 'Booking',
      params: { 
        id: movie.value._id,
        screeningId 
      }
    })
  }
  
  onMounted(async () => {
    try {
      loading.value = true
      movie.value = await movieStore.fetchMovieById(route.params.id)
    } catch (err) {
      error.value = 'Error al cargar los detalles de la película'
      console.error(err)
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
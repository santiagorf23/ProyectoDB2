<template>
  <div class="container py-4">
    <!-- Barra de búsqueda -->
    <div class="row mb-4">
      <div class="col-md-8 mx-auto">
        <div class="input-group">
          <span class="input-group-text">
            <i class="fas fa-search"></i>
          </span>
          <input 
            v-model="searchQuery"
            type="text"
            class="form-control"
            placeholder="Buscar películas..."
          >
        </div>
      </div>
    </div>
    
    <!-- Loading spinner -->
    <div v-if="loading" class="text-center py-5">
      <LoadingSpinner message="Cargando películas..." />
    </div>
    
    <!-- Mensaje de error -->
    <div v-else-if="error" class="alert alert-danger text-center" role="alert">
      <i class="fas fa-exclamation-circle me-2"></i>
      {{ error }}
    </div>
    
    <!-- Grid de películas -->
    <div v-else class="row g-4">
      <div v-for="movie in filteredMovies" 
           :key="movie._id"
           class="col-12 col-sm-6 col-lg-4"
      >
        <MovieCard :movie="movie" />
      </div>
    </div>

    <!-- Mensaje sin resultados -->
    <div v-if="!loading && !error && filteredMovies.length === 0" 
         class="text-center py-5">
      <i class="fas fa-film fa-3x text-muted mb-3"></i>
      <p class="lead text-muted">No se encontraron películas</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMovieStore } from '@/store/modules/movies'
import MovieCard from './MovieCard.vue'
import LoadingSpinner from '../shared/LoadingSpinner.vue'

const movieStore = useMovieStore()
const searchQuery = ref('')
const loading = ref(true)
const error = ref(null)

const filteredMovies = computed(() => {
  if (!searchQuery.value) return movieStore.movies
  
  return movieStore.movies.filter(movie => 
    movie.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

onMounted(async () => {
  try {
    loading.value = true
    await movieStore.fetchMovies()
  } catch (err) {
    error.value = 'Error al cargar las películas'
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>

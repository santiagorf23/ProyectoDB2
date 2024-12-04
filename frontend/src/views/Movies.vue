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
            @input="handleSearch"
          >
        </div>
      </div>
    </div>

    <!-- Carrusel de películas trending -->
    <TrendingMoviesCarousel />
    
    <!-- Resultados de búsqueda o lista de películas -->
    <div v-if="loading" class="text-center py-5">
      <LoadingSpinner message="Cargando películas..." />
    </div>
    
    <div v-else-if="error" class="alert alert-danger text-center" role="alert">
      <i class="fas fa-exclamation-circle me-2"></i>
      {{ error }}
    </div>
    
    <div v-else class="row g-4">
      <div v-for="movie in displayedMovies" 
           :key="movie.id"
           class="col-12 col-sm-6 col-lg-4"
      >
        <MovieCard :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMovieStore } from '@/store/modules/movies'
import MovieCard from '@/components/movies/MovieCard.vue'
import TrendingMoviesCarousel from '@/components/movies/TrendingMoviesCarousel.vue'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'

const movieStore = useMovieStore()
const searchQuery = ref('')
const loading = computed(() => movieStore.loading)
const error = computed(() => movieStore.error)

const displayedMovies = computed(() => {
  return searchQuery.value 
    ? movieStore.searchResults 
    : movieStore.movies
})

const handleSearch = async () => {
  if (searchQuery.value.length > 2) {
    await movieStore.searchMovies(searchQuery.value)
  }
}

onMounted(async () => {
  if (!movieStore.movies.length) {
    await movieStore.fetchMovies()
  }
})
</script>

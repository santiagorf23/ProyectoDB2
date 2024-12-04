<template>
  <div class="container-fluid p-0">
    <!-- Banner de bienvenida -->
    <div class="welcome-banner text-white p-5">
      <h1>Te damos la bienvenida.</h1>
      <p class="lead">Millones de películas, series y gente por descubrir. Explora ya.</p>
      
      <!-- Barra de búsqueda mejorada -->
      <div class="search-container">
        <div class="input-group">
          <input 
            v-model="searchQuery"
            type="text"
            class="form-control"
            placeholder="Buscar una película, serie, persona......"
            @input="handleSearch"
          >
          <button class="btn btn-search">Buscar</button>
        </div>
      </div>
    </div>

    <!-- Sección de Tendencias -->
    <div class="content-section">
      <div class="section-header">
        <h2 class="section-title">Tendencias</h2>
        <div class="filter-buttons">
          <button class="btn btn-dark btn-sm active">Hoy</button>
          <button class="btn btn-outline-dark btn-sm">Esta semana</button>
        </div>
      </div>

      <!-- Loading spinner -->
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
      </div>

      <!-- Error message -->
      <div v-else-if="error" class="alert alert-danger">
        {{ error }}
      </div>

      <!-- Lista de películas -->
      <div v-else class="row g-4">
        <div v-for="movie in displayedMovies" 
             :key="movie.id"
             class="col-6 col-sm-4 col-md-3 col-lg-2"
        >
          <div class="movie-card">
            <div class="poster-container">
              <img 
                :src="getTMDBImageUrl(movie.posterPath || movie.poster_path, 'w500')"
                :alt="movie.title"
                class="movie-poster"
                @error="handleImageError"
              >
              <div class="overlay">
                <router-link 
                  :to="{ name: 'MovieDetail', params: { id: movie.id }}"
                  class="btn btn-light btn-sm"
                >
                  Ver más
                </router-link>
              </div>
            </div>
            <h6 class="movie-title mt-2">{{ movie.title }}</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.welcome-banner {
  background: linear-gradient(to right, #032541, #01b4e4);
  padding: 3rem !important;
}

.search-container {
  max-width: 900px;
  margin: 20px auto 0;
}

.input-group {
  background: white;
  border-radius: 30px;
  overflow: hidden;
  padding: 2px;
}

.input-group input {
  border: none;
  padding: 10px 20px;
}

.input-group input:focus {
  box-shadow: none;
}

.btn-search {
  background-color: #01b4e4;
  color: white;
  border-radius: 30px;
  padding: 8px 25px;
  margin-right: 2px;
}

.content-section {
  padding: 20px 40px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0;
  position: relative;
  padding-bottom: 0.5rem;
}

.section-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 60px;
  height: 3px;
  background-color: #01b4e4;
}

.movie-card {
  transition: transform 0.3s ease;
}

.movie-card:hover {
  transform: translateY(-5px);
}

.poster-container {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}

.movie-poster {
  width: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
  border-radius: 8px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.poster-container:hover .overlay {
  opacity: 1;
}

.movie-title {
  font-size: 0.9rem;
  margin: 8px 0;
  font-weight: 500;
}

/* Animaciones */
.row > div {
  opacity: 0;
  animation: fadeIn 0.5s ease-in forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Aplicar delay a cada tarjeta */
.row > div:nth-child(1) { animation-delay: 0.1s; }
.row > div:nth-child(2) { animation-delay: 0.2s; }
.row > div:nth-child(3) { animation-delay: 0.3s; }
.row > div:nth-child(4) { animation-delay: 0.4s; }
.row > div:nth-child(5) { animation-delay: 0.5s; }
.row > div:nth-child(6) { animation-delay: 0.6s; }

@media (max-width: 768px) {
  .content-section {
    padding: 20px;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
}
</style>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMovieStore } from '@/store/modules/movies'
import { getTMDBImageUrl } from '@/utils/helpers'

const movieStore = useMovieStore()
const searchQuery = ref('')

// Computed properties
const loading = computed(() => movieStore.loading)
const error = computed(() => movieStore.error)
const displayedMovies = computed(() => {
  return searchQuery.value 
    ? movieStore.searchResults 
    : movieStore.movies
})

// Methods
const handleImageError = (event) => {
  event.target.src = '/placeholder-movie.jpg'
}

const handleSearch = async () => {
  if (searchQuery.value.length > 2) {
    await movieStore.searchMovies(searchQuery.value)
  }
}

// Lifecycle hooks
onMounted(async () => {
  if (!movieStore.movies.length) {
    await movieStore.fetchMovies()
  }
})
</script>

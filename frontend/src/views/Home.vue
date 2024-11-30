<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-section bg-dark text-white py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <h1 class="display-4 fw-bold mb-4">Bienvenido a CinemaApp</h1>
            <p class="lead mb-4">Descubre las mejores películas y reserva tus entradas de manera fácil y rápida.</p>
            <router-link to="/movies" class="btn btn-primary btn-lg">
              Ver Cartelera
            </router-link>
          </div>
          <div class="col-md-6 d-none d-md-block">
            <img src="/cinema-hero.jpg" alt="Cinema" class="img-fluid rounded shadow">
          </div>
        </div>
      </div>
    </section>

    <!-- Películas en Cartelera -->
    <section class="py-5">
      <div class="container">
        <h2 class="text-center mb-4">En Cartelera</h2>
        <div class="row">
          <div v-if="loading" class="col-12 text-center">
            <LoadingSpinner message="Cargando películas..." />
          </div>
          <div v-else-if="nowPlayingMovies.length" 
               v-for="movie in nowPlayingMovies" 
               :key="movie.id" 
               class="col-md-4 mb-4">
            <MovieCard :movie="formatMovieData(movie)" />
          </div>
        </div>
      </div>
    </section>

    <!-- Películas Populares -->
    <section class="bg-light py-5">
      <div class="container">
        <h2 class="text-center mb-4">Películas Populares</h2>
        <div class="row">
          <div v-if="loading" class="col-12 text-center">
            <LoadingSpinner message="Cargando películas..." />
          </div>
          <div v-else-if="popularMovies.length" 
               v-for="movie in popularMovies" 
               :key="movie.id" 
               class="col-md-4 mb-4">
            <MovieCard :movie="formatMovieData(movie)" />
          </div>
        </div>
      </div>
    </section>

    <!-- Promociones -->
    <section class="py-5">
      <div class="container">
        <h2 class="text-center mb-4">Promociones Especiales</h2>
        <div class="row g-4">
          <div class="col-md-4">
            <div class="card h-100">
              <div class="card-body text-center">
                <i class="fas fa-ticket-alt fa-3x text-primary mb-3"></i>
                <h5 class="card-title">2x1 Martes y Jueves</h5>
                <p class="card-text">Aprovecha nuestras promociones en días especiales.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100">
              <div class="card-body text-center">
                <i class="fas fa-users fa-3x text-primary mb-3"></i>
                <h5 class="card-title">Descuento Grupal</h5>
                <p class="card-text">Descuentos especiales para grupos de más de 5 personas.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100">
              <div class="card-body text-center">
                <i class="fas fa-birthday-cake fa-3x text-primary mb-3"></i>
                <h5 class="card-title">Cumpleaños</h5>
                <p class="card-text">Celebra tu cumpleaños con nosotros y obtén beneficios especiales.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MovieCard from '@/components/movies/MovieCard.vue'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'
import { tmdbService } from '@/services/tmdb'

const loading = ref(true)
const nowPlayingMovies = ref([])
const popularMovies = ref([])

const formatMovieData = (movie) => ({
  id: movie.id,
  title: movie.title,
  overview: movie.overview,
  posterPath: movie.poster_path,
  genre: movie.genre_ids?.join(', ') || 'Sin género',
  duration: '120',
  voteAverage: movie.vote_average || 0
})

onMounted(async () => {
  try {
    loading.value = true
    const [nowPlaying, popular] = await Promise.all([
      tmdbService.getNowPlaying(),
      tmdbService.getPopularMovies()
    ])
    
    nowPlayingMovies.value = nowPlaying
      .filter(movie => movie.poster_path)
      .slice(0, 6)
      .map(formatMovieData)
    
    popularMovies.value = popular
      .filter(movie => movie.poster_path)
      .slice(0, 6)
      .map(formatMovieData)
  } catch (error) {
    console.error('Error al cargar películas:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.hero-section {
  background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), 
              url('/cinema-hero.jpg') center/cover;
}
</style>
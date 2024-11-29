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
            <img src="" alt="Cinema" class="img-fluid rounded shadow">
          </div>
        </div>
      </div>
    </section>

    <!-- Películas Destacadas -->
    <section class="py-5">
      <div class="container">
        <h2 class="text-center mb-4">Películas Destacadas</h2>
        <div class="row">
          <div v-if="loading" class="col-12 text-center">
            <LoadingSpinner message="Cargando películas..." />
          </div>
          <div v-else-if="featuredMovies.length" 
                v-for="movie in featuredMovies" 
                :key="movie._id" 
                class="col-md-4 mb-4">
            <MovieCard :movie="movie" />
          </div>
        </div>
      </div>
    </section>

    <!-- Promociones -->
    <section class="bg-light py-5">
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
import { useMovieStore } from '@/store/modules/movies'

const movieStore = useMovieStore()
const loading = ref(true)
const featuredMovies = ref([])

onMounted(async () => {
  try {
    loading.value = true
    featuredMovies.value = await movieStore.fetchFeaturedMovies()
  } catch (error) {
    console.error('Error al cargar películas destacadas:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.hero-section {
  background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), 
              url('') center/cover;
}
</style>
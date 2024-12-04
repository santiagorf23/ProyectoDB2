<template>
  <div class="home">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-overlay"></div>
      <div class="container text-center py-5 position-relative">
        <h1 class="display-4 mb-3">Bienvenido a CinemaApp</h1>
        <p class="lead">Descubre las mejores películas y reserva tus entradas</p>
      </div>
    </div>

    <div class="container">
      <!-- Películas Trending -->
      <section class="trending-section mb-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="section-title">Películas Trending</h2>
        </div>
        <div v-if="loading" class="text-center">
          <LoadingSpinner message="Cargando películas trending..." />
        </div>
        <div v-else>
          <TrendingMoviesCarousel />
        </div>
      </section>

      <!-- Películas en Cartelera -->
      <section class="now-playing-section mb-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="section-title">En Cartelera</h2>
        </div>
        <div v-if="loading" class="text-center">
          <LoadingSpinner message="Cargando películas en cartelera..." />
        </div>
        <div v-else-if="error" class="alert alert-danger">
          {{ error }}
        </div>
        <div v-else class="row g-4">
          <div v-for="movie in nowPlayingMovies" 
               :key="movie.id" 
               class="col-12 col-sm-6 col-lg-4">
            <MovieCard :movie="movie" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMovieStore } from '@/store/modules/movies'
import MovieCard from '@/components/movies/MovieCard.vue'
import TrendingMoviesCarousel from '@/components/movies/TrendingMoviesCarousel.vue'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'

const movieStore = useMovieStore()
const loading = ref(true)
const error = ref(null)
const nowPlayingMovies = ref([])

onMounted(async () => {
  try {
    loading.value = true
    nowPlayingMovies.value = await movieStore.fetchNowPlayingMovies()
  } catch (err) {
    error.value = 'Error al cargar las películas en cartelera'
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.hero-section {
  position: relative;
  background-image: url('/cinema-banner.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  padding: 6rem 0;
  min-height: 400px;
  display: flex;
  align-items: center;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to right,
    rgba(26, 35, 126, 0.9),
    rgba(13, 71, 161, 0.7)
  );
  z-index: 1;
}

.hero-section .container {
  z-index: 2;
}

.hero-section h1 {
  font-size: 3.5rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-section .lead {
  font-size: 1.5rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.section-title {
  font-size: 2rem;
  font-weight: 600;
  color: #2c3e50;
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
  background-color: #0d47a1;
}

.trending-section,
.now-playing-section {
  padding: 2rem 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-section {
    padding: 4rem 0;
    min-height: 300px;
  }

  .hero-section h1 {
    font-size: 2.5rem;
  }

  .hero-section .lead {
    font-size: 1.2rem;
  }

  .section-title {
    font-size: 1.5rem;
  }
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

/* Aseguramos que el navbar no tenga margen inferior */
:deep(.navbar) {
  margin-bottom: 0;
}
</style>
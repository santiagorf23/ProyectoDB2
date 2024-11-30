<template>
  <div class="card h-100 shadow-sm">
    <div class="card-img-container">
      <img 
        :src="getPosterUrl(movie.posterPath)"
        :alt="movie.title"
        class="card-img-top"
        @error="handleImageError"
      >
    </div>
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">{{ movie.title }}</h5>
      <div class="d-flex justify-content-between align-items-center mb-2">
        <span class="text-muted">{{ movie.genre }}</span>
        <span class="badge bg-warning text-dark">⭐ {{ movie.voteAverage.toFixed(1) }}</span>
      </div>
      <p class="card-text flex-grow-1">
        {{ truncateText(movie.overview, 150) }}
      </p>
      <div class="d-grid gap-2">
        <button 
          @click="navigateToDetail"
          class="btn btn-primary"
        >
          <i class="fas fa-info-circle me-2"></i>
          Ver Detalles
        </button>
        <button 
          @click="navigateToBooking"
          class="btn btn-success"
        >
          <i class="fas fa-ticket-alt me-2"></i>
          Reservar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const getPosterUrl = (posterPath) => {
  if (!posterPath) return '/placeholder-movie.jpg'
  return `${import.meta.env.VITE_TMDB_IMAGE_URL}/w500${posterPath}`
}

const handleImageError = (event) => {
  event.target.src = '/placeholder-movie.jpg'
}

const truncateText = (text, length) => {
  if (!text) return ''
  return text.length > length ? text.substring(0, length) + '...' : text
}

const navigateToDetail = () => {
  router.push(`/movies/${props.movie.id}`)
}

const navigateToBooking = () => {
  router.push(`/booking/${props.movie.id}`)
}
</script>

<style scoped>
.card-img-container {
  position: relative;
  padding-top: 150%; /* Aspecto 2:3 para posters de películas */
  overflow: hidden;
}

.card-img-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card:hover {
  transform: translateY(-5px);
  transition: transform 0.2s ease;
}

@media (max-width: 768px) {
  .card-img-container {
    padding-top: 120%; /* Ajuste para móviles */
  }
}
</style>

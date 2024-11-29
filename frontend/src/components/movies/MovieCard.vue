<template>
  <div class="card h-100 shadow-sm">
    <img 
      :src="posterUrl" 
      :alt="movie.title"
      class="card-img-top"
      style="height: 400px; object-fit: cover;"
    >
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">{{ movie.title }}</h5>
      <p class="card-text text-muted mb-2">
        {{ movie.genre }} | {{ movie.duration }} min
      </p>
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

const posterUrl = computed(() => {
  return props.movie.posterPath 
    ? `https://image.tmdb.org/t/p/w500${props.movie.posterPath}`
    : '/placeholder-movie.jpg'
})

const truncateText = (text, length) => {
  if (!text) return ''
  return text.length > length ? text.substring(0, length) + '...' : text
}

const navigateToDetail = () => {
  router.push(`/movies/${props.movie._id}`)
}

const navigateToBooking = () => {
  router.push(`/booking/${props.movie._id}`)
}
</script>

<style scoped>
.card {
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
}
</style>

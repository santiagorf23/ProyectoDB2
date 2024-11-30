<template>
  <div class="container py-5">
    <div v-if="loading" class="text-center py-5">
      <LoadingSpinner message="Cargando detalles..." />
    </div>

    <div v-else-if="error" class="alert alert-danger" role="alert">
      <i class="fas fa-exclamation-circle me-2"></i>
      {{ error }}
    </div>

    <div v-else-if="movie" class="row">
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
            v-if="trailerUrl"
            :href="trailerUrl"
            target="_blank"
            class="btn btn-outline-primary"
          >
            <i class="fab fa-youtube me-2"></i>
            Ver Trailer
          </a>
        </div>
      </div>

      <div class="col-md-8">
        <h1 class="mb-3">{{ movie.title }}</h1>
        
        <div class="mb-4">
          <span v-for="genre in movie.genres" 
                :key="genre.id" 
                class="badge bg-primary me-2">
            {{ genre.name }}
          </span>
          <span class="badge bg-secondary me-2">{{ movie.runtime }} min</span>
          <span class="badge bg-warning text-dark">⭐ {{ movie.vote_average.toFixed(1) }}</span>
        </div>

        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">Sinopsis</h5>
            <p class="card-text">{{ movie.overview }}</p>
          </div>
        </div>

        <div class="row mb-4">
          <div class="col-md-6">
            <h5>Director</h5>
            <p>{{ director }}</p>
            
            <h5>Fecha de estreno</h5>
            <p>{{ movie.release_date }}</p>
          </div>
          <div class="col-md-6">
            <h5>Reparto principal</h5>
            <p>{{ cast }}</p>
            
            <h5>Idioma original</h5>
            <p>{{ movie.original_language }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { tmdbService } from '@/services/tmdb'
import LoadingSpinner from '../shared/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()

const movie = ref(null)
const loading = ref(true)
const error = ref(null)

const posterUrl = computed(() => {
  if (!movie.value?.poster_path) return '/placeholder-movie.jpg'
  return `${import.meta.env.VITE_TMDB_IMAGE_URL}/w500${movie.value.poster_path}`
})

const trailerUrl = computed(() => {
  const video = movie.value?.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')
  return video ? `https://www.youtube.com/watch?v=${video.key}` : null
})

const director = computed(() => {
  return movie.value?.credits?.crew?.find(c => c.job === 'Director')?.name || 'No disponible'
})

const cast = computed(() => {
  return movie.value?.credits?.cast
    ?.slice(0, 5)
    ?.map(actor => actor.name)
    ?.join(', ') || 'No disponible'
})

const navigateToBooking = () => {
  router.push(`/booking/${movie.value.id}`)
}

onMounted(async () => {
  try {
    loading.value = true
    movie.value = await tmdbService.getMovieDetails(route.params.id)
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
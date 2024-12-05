<template>
  <!-- Banner con fondo de película -->
  <div class="movie-backdrop" v-if="movie">
    <div class="backdrop-overlay">
      <div class="container">
        <div class="row py-5">
          <!-- Poster -->
          <div class="col-md-3">
            <img 
              :src="getTMDBImageUrl(movie.poster_path, 'w500')"
              :alt="movie.title"
              class="movie-poster img-fluid rounded shadow"
              @error="handleImageError"
            >
          </div>
          <!-- Información principal -->
          <div class="col-md-9 text-white">
            <h1 class="display-4 mb-2">{{ movie.title }}</h1>
            <div class="movie-meta mb-3">
              <span class="release-date">{{ formatDate(movie.release_date) }}</span>
              <span class="genres">{{ movie.formattedGenres }}</span>
              <span class="duration" v-if="movie.runtime">{{ movie.runtime }} min</span>
            </div>
            
            <!-- Rating y acciones -->
            <div class="d-flex align-items-center mb-4">
              <div class="rating-circle me-3">
                {{ Math.round(movie.vote_average * 10) }}%
              </div>
              <button 
                class="btn btn-primary me-2" 
                @click="scrollToTrailer" 
                v-if="movie?.trailerUrl"
              >
                <i class="fas fa-play me-2"></i>
                Ver Trailer
              </button>
              <!-- Nuevo botón de reserva -->
              <button 
                v-if="isInTheaters"
                class="btn btn-success" 
                @click="goToBooking"
              >
                <i class="fas fa-ticket-alt me-2"></i>
                Reservar Entradas
              </button>
            </div>

            <!-- Sinopsis -->
            <h5 class="tagline mb-2" v-if="movie.tagline">{{ movie.tagline }}</h5>
            <h6 class="mb-2">Sinopsis</h6>
            <p class="overview">{{ movie.overview }}</p>

            <!-- Créditos -->
            <div class="row mt-4">
              <div class="col-md-4" v-if="movie.director">
                <h6>Director</h6>
                <p>{{ movie.director }}</p>
              </div>
              <div class="col-md-8" v-if="movie.cast">
                <h6>Reparto Principal</h6>
                <p>{{ movie.cast }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Nueva sección de trailer -->
  <div class="container my-5" v-if="movie?.trailerUrl">
    <div class="row">
      <div class="col-12">
        <h3 class="mb-4">Trailer</h3>
        <div class="trailer-container">
          <iframe
            :src="getYoutubeEmbedUrl(movie.trailerUrl)"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="trailer-iframe"
          ></iframe>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading y error states permanecen igual -->
  <div v-if="loading" class="text-center py-5">
    <LoadingSpinner message="Cargando detalles..." />
  </div>

  <div v-else-if="error" class="alert alert-danger m-4" role="alert">
    {{ error }}
  </div>
</template>

<style scoped>
.movie-backdrop {
  position: relative;
  background-size: cover;
  background-position: center;
  min-height: 600px;
}

.backdrop-overlay {
  /* background: linear-gradient(to right, rgba(3, 37, 65, 0.95) 20%, rgba(3, 37, 65, 0.75) 100%); */
  width: 100%;
  height: 100%;
}

.movie-poster {
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.movie-meta span {
  margin-right: 15px;
  font-size: 0.9rem;
  opacity: 0.8;
}

.rating-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #032541;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
  border: 3px solid #01b4e4;
}

.tagline {
  font-style: italic;
  opacity: 0.8;
}

.overview {
  line-height: 1.6;
  opacity: 0.9;
}

.trailer-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* Aspecto 16:9 */
  height: 0;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.trailer-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Estilos para el botón de reserva */
.btn-success {
  background-color: #01b4e4;
  border-color: #01b4e4;
}

.btn-success:hover {
  background-color: #0192b7;
  border-color: #0192b7;
}
</style>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMovieStore } from '@/store/modules/movies'
import { getTMDBImageUrl } from '@/utils/helpers'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()
const movieStore = useMovieStore()
const movie = ref(null)
const loading = ref(true)
const error = ref(null)

// Agregar método para manejar errores de imagen
const handleImageError = (event) => {
  event.target.src = '/placeholder-movie.jpg'
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Computed para el estilo del backdrop
const backdropStyle = computed(() => {
  if (!movie.value?.backdrop_path) return {}
  return {
    backgroundImage: `url(${getTMDBImageUrl(movie.value.backdrop_path, 'original')})`
  }
})

// Agregar función para convertir URL de YouTube
const getYoutubeEmbedUrl = (url) => {
  if (!url) return ''
  const videoId = url.split('v=')[1]
  return `https://www.youtube.com/embed/${videoId}`
}

// Computed property para verificar si la película está en cartelera
const isInTheaters = computed(() => {
  if (!movie.value?.release_date) return false
  
  const releaseDate = new Date(movie.value.release_date)
  const today = new Date()
  
  // Consideramos que está en cartelera si se estrenó en los últimos 30 días
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(today.getDate() - 30)
  
  return releaseDate >= thirtyDaysAgo && releaseDate <= today
})

// Método para navegar a la página de reserva
const goToBooking = () => {
  router.push({
    name: 'Booking',
    params: { movieId: movie.value.id }
  })
}

onMounted(async () => {
  try {
    loading.value = true
    movie.value = await movieStore.fetchMovieById(route.params.id)
    
    // Esperar al siguiente tick para asegurar que el elemento existe
    await nextTick(() => {
      const backdropElement = document.querySelector('.movie-backdrop')
      if (backdropElement && movie.value?.backdrop_path) {
        backdropElement.style.backgroundImage = 
          `url(${getTMDBImageUrl(movie.value.backdrop_path, 'original')})`
      }
    })
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>